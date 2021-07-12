require(`dotenv`).config()
const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const config = require(`../config.json`)
const { MongoClient } = require('mongodb');
const client = new MongoClient(process.env.MONGODB_URI_UUID, { useNewUrlParser: true, useUnifiedTopology: true });
const hy = require(`../utils/hypixel`);
const mc = require(`../utils/mojang`);
const colours = require(`../utils/minecraftColours.json`)

router.use(express.json());
client.connect(err => {
	if (err) {
		console.log(err)
		console.log("failed to connect to database, aborting...");
		process.exit()
	}
	console.log("Connected to database from player.js")
})

router.get('/', async function (req, res) {
	let cache = client.db("cache").collection("player")
	let formattedPlayer
	let userQuery;

	try {
		if (!req.query.uuid && !req.query.name) throw new Error(`Missing field(s): [uuid] or [name]`);
		if (req.query.name && !req.query.uuid) {
			const username = typeof (req.query.name) == "object" ? req.query.name[0].toLowerCase() : req.query.name.toLowerCase();
			userQuery = await mc.getUUID(username).catch(err => { throw new Error(err) })
		} else userQuery = typeof (req.query.uuid) == "object" ? req.query.uuid[0].toLowerCase() : req.query.uuid.toLowerCase();

		const options = typeof (req.query?.options) == "object" ? req.query.options : req.query?.options?.toLowerCase().split(/ +/) ?? []

		const cacheUser = await cache.findOne({ uuid: userQuery })
		const cacheHasFriends = cacheUser?.friends ? true : false;
		const cacheHasGuild = cacheUser?.guild ? true : false;

		if (cacheUser == null || new Date().getTime() > cacheUser?.expiresAt || (!cacheHasFriends && options.includes('friends')) || (!cacheHasGuild && options.includes('guild'))) {
			// _ Actually fetch user data
			const response = await fetch(`${config.BASE_URL}/player?uuid=${userQuery}&key=${process.env.HYPIXEL_API_KEY}`);
			if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
			const json = await response.json()
			const player = json.player
			if (player == null) {
				throw new Error("This user has not logged on to Hypixel")
			}

			// _ Guild Data
			const { guild, member, rank, guildLevel } = await getGuildData()
			async function getGuildData() {
				// return early instead of nesting
				if (!options.includes("guild")) {
					return {
						guild: null,
						member: null,
						rank: null,
						guildLevel: null
					};
				}

				const guildResponse = await fetch(`${config.BASE_URL}/guild?player=${userQuery}&key=${process.env.HYPIXEL_API_KEY}`)
				if (!guildResponse.ok) throw new Error(`${guildResponse.status} ${guildResponse.statusText}`);
				const guildJson = await guildResponse.json()
				if (guildJson.guild === null) return {
					guild: null,
					member: null,
					rank: null,
					guildLevel: null
				};

				const guild = guildJson.guild
				const member = guild.members.find(p => p.uuid == player.uuid)
				const rank = guild.ranks.find(rank => rank.name == member.rank)

				return {
					guild,
					member,
					rank,
					guildLevel: hy.getGuildLevel(guild.exp)
				}
			}

			// _ Friends  
			let friends = null;
			if (options.includes("friends")) {
				const friendResponse = await fetch(`${config.BASE_URL}/friends?uuid=${userQuery}&key=${process.env.HYPIXEL_API_KEY}`)
				if (!friendResponse.ok) throw new Error(`${friendResponse.status} ${friendResponse.statusText}`)
				const friendJson = await friendResponse.json()
				friends = friendJson.records?.length ?? 0
			}

			// _ Getting data Hypixel made harder to retreive
			const playerRank = hy.getPlayerRank(player)
			const playerLevel = hy.calculatePlayerLevel(player?.networkExp ?? 0)
			const online = await hy.getPlayerStatus(userQuery)
			const challenges = hy.getTotalChallenges(player?.challenges)
			const quests = hy.getTotalQuests(player?.quests)

			// _ Massive formatted data
			formattedPlayer = {
				// General Info
				uuid: player.uuid ?? undefined,
				displayName: player.displayname ?? undefined,
				networkExp: player.networkExp,
				level: playerLevel ?? undefined,
				friends: friends ?? undefined,
				chat: player.channel ?? undefined,
				language: player.userLanguage ?? undefined,

				// Login And last game
				online: online,
				lastVersion: player.mcVersionRp ?? undefined,
				firstLogin: player.firstLogin ?? undefined,
				lastLogin: player.lastLogin ?? undefined,
				lastLogout: player.lastLogout ?? undefined,
				lastGame: player.mostRecentGameType ?? undefined,

				// The Other Statistics
				karma: player.karma ?? undefined,
				achievementPoints: player.achievementPoints ?? undefined,
				achievementsCompleted: player.achievementsOneTime.length ?? undefined,
				challenges: challenges,
				quests: quests,

				// Rank
				rank: {
					type: playerRank,
					plus: player.rankPlusColor ? {
						colour: player.rankPlusColor,
						hex: colours[player.rankPlusColor.toLowerCase()],
					} : undefined,
					rankColour: rankColours[player?.monthlyRankColor || playerRank]
				},

				// Guild
				guild: guild != null ? {
					name: guild.name,
					exp: guild.exp,
					level: guildLevel,
					description: guild.description,
					tag: {
						text: guild.tag,
						colour: guild.tagColor,
						hex: colours[guild.tagColor.toLowerCase()]
					},
					member: {
						rank: member.rank,
						tag: rank?.tag ?? "GM",
						quests: member.questParticipation,
						joinedAt: member.joined,
						expHistory: member.expHistory,
					},
				} : undefined,

				// Cosmetics
				cosmetics: {
					count: player.vanityMeta?.packages.length ?? 0,
					gadget: player.currentGadget ?? undefined,
					clickEffect: player.currentClickEffect ?? undefined,
					cloak: player.currentCloak ?? undefined,
					hat: player.currentHat ?? undefined,

					// PET
					pet: player.currentPet ? {
						name: player.petStats[player.currentPet]?.name ? player.petStats[player.currentPet]?.name.replace(/§./gi, "") : undefined,
						hunger: player.petStats[player.currentPet]?.HUNGER ?? undefined,
						exercise: player.petStats[player.currentPet]?.EXERCISE ?? undefined,
						type: player.currentPet ?? undefined
					} : undefined,

					totem: player.achievementTotem ? {
						maxLength: player.achievementTotem.allowed_max_height,
						body: {
							0: player.achievementTotem.selectedParts.slot_0 ? {
								type: player.achievementTotem.selectedParts.slot_0,
								colour: player.achievementTotem.selectedColors.slotcolor_0,
							} : undefined,
							1: player.achievementTotem.selectedParts.slot_1 ? {
								type: player.achievementTotem.selectedParts.slot_1,
								colour: player.achievementTotem.selectedColors.slotcolor_1 ?? player.achievementTotem.selectedColors.slotcolor_0,
							} : undefined,
							2: player.achievementTotem.selectedParts.slot_2 ? {
								type: player.achievementTotem.selectedParts.slot_2,
								colour: player.achievementTotem.selectedColors.slotcolor_2 ?? player.achievementTotem.selectedColors.slotcolor_0,
							} : undefined,
							3: player.achievementTotem.selectedParts.slot_3 ? {
								type: player.achievementTotem.selectedParts.slot_3,
								colour: player.achievementTotem.selectedColors.slotcolor_3 ?? player.achievementTotem.selectedColors.slotcolor_0,
							} : undefined,
							4: player.achievementTotem.selectedParts.slot_4 ? {
								type: player.achievementTotem.selectedParts.slot_4,
								colour: player.achievementTotem.selectedColors.slotcolor_4 ?? player.achievementTotem.selectedColors.slotcolor_0,
							} : undefined,
							5: player.achievementTotem.selectedParts.slot_5 ? {
								type: player.achievementTotem.selectedParts.slot_5,
								colour: player.achievementTotem.selectedColors.slotcolor_5 ?? player.achievementTotem.selectedColors.slotcolor_0,
							} : undefined,
							6: player.achievementTotem.selectedParts.slot_6 ? {
								type: player.achievementTotem.selectedParts.slot_6,
								colour: player.achievementTotem.selectedColors.slotcolor_6 ?? player.achievementTotem.selectedColors.slotcolor_0,
							} : undefined,
						}
					} : undefined,
				},

				// Socials
				social: player?.socialMedia ? {
					twitter: player.socialMedia?.links?.TWITTER ?? undefined,
					youtube: player.socialMedia?.links?.YOUTUBE ?? undefined,
					instagram: player.socialMedia?.links?.INSTAGRAM ?? undefined,
					twitch: player.socialMedia?.links?.TWITCH ?? undefined,
					discord: player.socialMedia?.links?.DISCORD ?? undefined,
					hypixel: player.socialMedia?.links?.HYPIXEL ?? undefined,
				} : undefined,

				// Daily Reward
				dailyReward: player?.lastClaimedReward ? {
					availableIn: (86400000 - (new Date() - (player.lastClaimedReward))) < 0 ? 0 : 86400000 - (new Date() - (player.lastClaimedReward)),
					streak: player.rewardStreak,
					highScore: player.rewardHighScore
				} : undefined,


				// Ranks Gifted
				gifted: player.giftingMeta ? {
					giftsGiven: player.giftingMeta.bundlesGiven ?? undefined,
					giftsReceived: player.giftingMeta.bundlesReceived ?? undefined,
					ranksGiven: player.giftingMeta.ranksGiven ?? undefined
				} : undefined,

				expiresAt: new Date().getTime() + config.expirationTime,
			};

			const cleanedFormatted = removeEmpty(formattedPlayer)

			// _ Update Database
			if (cacheUser == null) cache.insertOne(cleanedFormatted, (err, res) => {
				if (err) throw new Error(`Error inserting to database: ${err}`)
			})
			else
				cache.updateOne({ _id: cacheUser._id }, { $set: cleanedFormatted }, (err, res) => {
					if (err) throw new Error(`Error inserting to database: ${err}`)
				})

		} else {
			delete cacheUser._id
			delete cacheUser.expiresAt
			formattedPlayer = cacheUser
		}

		delete formattedPlayer.expiresAt
		res.status(200).send({
			...formattedPlayer
		})
	} catch (err) {
		res.status(404).json({
			error: err.message
		})
	}
})

module.exports = router

function removeEmpty(obj) {
	return Object.fromEntries(
		Object.entries(obj)
			.filter(([_, v]) => v != null)
			.map(([k, v]) => [k, v === Object(v) ? removeEmpty(v) : v])
	);
}

const rankColours = {
	"DEFAULT": colours.gray,
	"VIP": colours.green,
	"VIP+": colours.green,
	"MVP": colours.aqua,
	"GOLD": colours.gold,
	"AQUA": colours.aqua
}