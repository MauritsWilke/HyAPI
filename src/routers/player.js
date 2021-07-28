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
const utils = require(`../utils/utils`)

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
				const member = guild?.members?.find(p => p.uuid == player.uuid) ?? ""
				const rank = guild?.ranks?.find(rank => rank.name == member.rank) ?? ""

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
			reformattedData = {
				// General Info
				uuid: player.uuid ?? null,
				displayName: player.displayname ?? null,
				networkExp: player.networkExp,
				level: playerLevel ?? null,
				friends: friends ?? null,
				chat: player.channel ?? null,
				language: player.userLanguage ?? null,

				// Login And last game
				online: online,
				lastVersion: player.mcVersionRp ?? null,
				firstLogin: player.firstLogin ?? null,
				lastLogin: player.lastLogin ?? null,
				lastLogout: player.lastLogout ?? null,
				lastGame: player.mostRecentGameType ?? null,

				// The Other Statistics
				karma: player.karma ?? null,
				achievementPoints: player.achievementPoints ?? null,
				achievementsCompleted: player?.achievementsOneTime?.length ?? 0,
				challenges: challenges,
				quests: quests,

				// Rank
				rank: !config.devUUIDs.includes(player.uuid) ? {
					type: playerRank,
					plus: player.rankPlusColor ? {
						colour: player.rankPlusColor,
						hex: colours[player.rankPlusColor.toLowerCase()],
					} : null,
					rankColour: playerRank == "PIG+++" ? colours.light_purple : hy.rankColours[playerRank == "YOUTUBER" ? playerRank : player?.monthlyRankColor || playerRank]
				} : {
					type: "HyAPI Dev",
					rankColour: colours.blue
				},

				// Guild
				guild: guild != null ? {
					name: guild.name,
					exp: guild.exp,
					level: guildLevel,
					description: guild.description,
					tag: guild?.tag ? {
						text: guild.tag,
						colour: guild.tagColor,
						hex: colours[guild?.tagColor?.toLowerCase()] ?? colours.gray
					} : null,
					member: {
						rank: member?.rank,
						tag: rank?.tag ?? "GM",
						quests: member?.questParticipation,
						joinedAt: member?.joined,
						expHistory: member?.expHistory,
					},
				} : null,

				// Cosmetics
				cosmetics: {
					count: player.vanityMeta?.packages.length ?? 0,
					gadget: player.currentGadget ?? null,
					clickEffect: player.currentClickEffect ?? null,
					cloak: player.currentCloak ?? null,
					hat: player.currentHat ?? null,

					// PET
					pet: player?.currentPet ? {
						name: player?.petStats?.[player?.currentPet]?.name ? player?.petStats[player?.currentPet]?.name?.replace(/§./gi, "") : null,
						hunger: player?.petStats?.[player?.currentPet]?.HUNGER ?? null,
						exercise: player?.petStats?.[player?.currentPet]?.EXERCISE ?? null,
						type: player?.currentPet ?? null
					} : null,

					totem: player.achievementTotem ? {
						maxLength: player.achievementTotem.allowed_max_height,
						body: {
							0: player.achievementTotem.selectedParts.slot_0 ? {
								type: player.achievementTotem.selectedParts.slot_0,
								colour: player.achievementTotem.selectedColors.slotcolor_0,
							} : null,
							1: player.achievementTotem.selectedParts.slot_1 ? {
								type: player.achievementTotem.selectedParts.slot_1,
								colour: player.achievementTotem.selectedColors.slotcolor_1 ?? player.achievementTotem.selectedColors.slotcolor_0,
							} : null,
							2: player.achievementTotem.selectedParts.slot_2 ? {
								type: player.achievementTotem.selectedParts.slot_2,
								colour: player.achievementTotem.selectedColors.slotcolor_2 ?? player.achievementTotem.selectedColors.slotcolor_0,
							} : null,
							3: player.achievementTotem.selectedParts.slot_3 ? {
								type: player.achievementTotem.selectedParts.slot_3,
								colour: player.achievementTotem.selectedColors.slotcolor_3 ?? player.achievementTotem.selectedColors.slotcolor_0,
							} : null,
							4: player.achievementTotem.selectedParts.slot_4 ? {
								type: player.achievementTotem.selectedParts.slot_4,
								colour: player.achievementTotem.selectedColors.slotcolor_4 ?? player.achievementTotem.selectedColors.slotcolor_0,
							} : null,
							5: player.achievementTotem.selectedParts.slot_5 ? {
								type: player.achievementTotem.selectedParts.slot_5,
								colour: player.achievementTotem.selectedColors.slotcolor_5 ?? player.achievementTotem.selectedColors.slotcolor_0,
							} : null,
							6: player.achievementTotem.selectedParts.slot_6 ? {
								type: player.achievementTotem.selectedParts.slot_6,
								colour: player.achievementTotem.selectedColors.slotcolor_6 ?? player.achievementTotem.selectedColors.slotcolor_0,
							} : null,
						}
					} : null,
				},

				// Socials
				social: player?.socialMedia ? {
					twitter: player.socialMedia?.links?.TWITTER ?? null,
					youtube: player.socialMedia?.links?.YOUTUBE ?? null,
					instagram: player.socialMedia?.links?.INSTAGRAM ?? null,
					twitch: player.socialMedia?.links?.TWITCH ?? null,
					discord: player.socialMedia?.links?.DISCORD ?? null,
					hypixel: player.socialMedia?.links?.HYPIXEL ?? null,
				} : null,

				// Daily Reward
				dailyReward: player?.lastClaimedReward ? {
					availableIn: (86400000 - (new Date() - (player.lastClaimedReward))) < 0 ? 0 : 86400000 - (new Date() - (player.lastClaimedReward)),
					streak: player.rewardStreak,
					highScore: player.rewardHighScore
				} : null,

				// Ranks Gifted
				gifted: player.giftingMeta ? {
					giftsGiven: player.giftingMeta.bundlesGiven ?? null,
					giftsReceived: player.giftingMeta.bundlesReceived ?? null,
					ranksGiven: player.giftingMeta.ranksGiven ?? null
				} : null,

				expiresAt: new Date().getTime() + config.expirationTime,
			};

			formattedPlayer = utils.removeEmpty(reformattedData)

			// _ Update Database
			if (cacheUser == null) cache.insertOne(formattedPlayer, (err, res) => {
				if (err) throw new Error(`Error inserting to database: ${err}`)
			})
			else {
				cache.updateOne({ _id: cacheUser._id }, { $set: formattedPlayer }, (err, res) => {
					if (err) throw new Error(`Error inserting to database: ${err}`)
				})
			}

		} else {
			delete cacheUser._id
			delete cacheUser.expiresAt
			formattedPlayer = cacheUser
		}

		const { expiresAt, _id, ...rest } = formattedPlayer
		res.status(200).send({
			...rest
		})
	} catch (err) {
		res.status(404).json({
			error: err.message
		})
	}
})

module.exports = router