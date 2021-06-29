// ! Daily reward available in not showing the correct time
// ! Add all the other stats 😭
// ! Bedwars Dream Mode

var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');
const hy = require(`../utils/hypixel`);
const mc = require(`../utils/mojang`);

const BASE_URL = "https://api.hypixel.net";

router.use(express.json());

router.get('/', async function (req, res) {
	//try {
	if (!req.query.uuid && !req.query.name) throw new Error(`Missing field(s): [uuid] or [name]`);
	let userQuery;
	if (req.query.name && !req.query.uuid) {
		const username = typeof (req.query.name) == "object" ? req.query.name[0].toLowerCase() : req.query.name.toLowerCase();
		userQuery = await mc.getUUID(username)
	} else {
		userQuery = typeof (req.query.uuid) == "object" ? req.query.uuid[0].toLowerCase() : req.query.uuid.toLowerCase();
	}


	// _ Actually fetch user data
	const response = await fetch(`${BASE_URL}/player?uuid=${userQuery}&key=${process.env.HYPIXEL_API_KEY}`);
	if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
	const json = await response.json()
	const player = json.player

	// _ Getting data Hypixel made harder to retreive
	const playerRank = hy.getPlayerRank(player)
	const playerLevel = hy.calculatePlayerLevel(player.networkExp)
	const online = await hy.getPlayerStatus(userQuery)

	const formattedPlayer = {
		// General Info
		uuid: player.uuid,
		displayName: player.displayname,
		level: playerLevel,
		chat: player.channel,
		language: player.userLanguage,

		// Login And last game
		online: online,
		lastVersion: player.mcVersionRp,
		lastLogin: player.lastLogin,
		lastLogout: player.lastLogout,
		lastGame: player.mostRecentGameType,

		// The Other Statistics
		karma: player.karma,
		achievementPoints: player.achievementPoints,
		achievementsCompleted: player.achievementsOneTime.length,
		// ! quests: 0,

		// Cosmetics
		cosmetics: {
			count: player.vanityMeta.packages.length ?? 0,
			gadget: player.currentGadget,
			clickEffect: player.currentClickEffect,
			cloak: player.currentCloak,
			hat: player.currentHat,

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
						colour: player.achievementTotem.selectedColors.slotcolor_1,
					} : undefined,
					2: player.achievementTotem.selectedParts.slot_2 ? {
						type: player.achievementTotem.selectedParts.slot_2,
						colour: player.achievementTotem.selectedColors.slotcolor_2,
					} : undefined,
					3: player.achievementTotem.selectedParts.slot_3 ? {
						type: player.achievementTotem.selectedParts.slot_3,
						colour: player.achievementTotem.selectedColors.slotcolor_3,
					} : undefined,
					4: player.achievementTotem.selectedParts.slot_4 ? {
						type: player.achievementTotem.selectedParts.slot_4,
						colour: player.achievementTotem.selectedColors.slotcolor_4,
					} : undefined,
					5: player.achievementTotem.selectedParts.slot_5 ? {
						type: player.achievementTotem.selectedParts.slot_5,
						colour: player.achievementTotem.selectedColors.slotcolor_5,
					} : undefined,
					6: player.achievementTotem.selectedParts.slot_6 ? {
						type: player.achievementTotem.selectedParts.slot_6,
						colour: player.achievementTotem.selectedColors.slotcolor_6,
					} : undefined,
				}
			} : undefined,
		},

		// Socials
		social: player?.socialMedia ? {
			twitter: player.socialMedia?.links?.TWITTER,
			youtube: player.socialMedia?.links?.YOUTUBE,
			instagram: player.socialMedia?.links?.INSTAGRAM,
			twitch: player.socialMedia?.links?.TWITCH,
			discord: player.socialMedia?.links?.DISCORD,
			hypixel: player.socialMedia?.links?.HYPIXEL,
		} : undefined,

		// Daily Reward
		dailyReward: player?.lastClaimedReward ? {
			availableIn: 86400000 - (new Date() - (player.lastClaimedReward)),
			streak: player.rewardStreak,
			highScore: player.rewardHighScore
		} : undefined,

		// Rank
		rank: {
			type: playerRank,
			plusColour: player.rankPlusColor,
			rankColour: player.monthlyRankColor
		},


		// Ranks Gifted
		gifted: player.giftingMeta ? {
			giftsGiven: player.giftingMeta.bundlesGiven,
			giftsReceived: player.giftingMeta.bundlesReceived,
			ranksGiven: player.giftingMeta.ranksGiven
		} : undefined,

		// Game Statistics
		stats: {
			arcade: player.stats?.Arcade ? {
				coins: player.stats.Arcade.coins,
				zombies: {

				},
				hideAndSeek: {

				},
				partyGames: {

				},
				enderSpleef: {

				},
				scubaSimulator: {

				},
				throwOut: {

				},
				football: {
					wins: player.stats.Arcade.wins_soccer,
					goals: player.stats.Arcade.goals_soccer,
					kicks: player.stats.Arcade.kicks_soccer,
					powerKicks: player.stats.Arcade.powerkicks_soccer
				},
				dragonWars: {

				},
				holeInTheWall: {

				},
				miniWalls: {

				}
			} : undefined,
			bedwars: player.stats?.Bedwars ? {
				star: player.achievements.bedwars_level,
				lootboxes: player.stats.Bedwars.bedwars_boxes,
				coins: player.stats.Bedwars.coins,
				gamesPlayed: player.stats.Bedwars.games_played_bedwars,
				privateGamesPlayed: player.stats.Bedwars.games_played_bedwars_1 - player.stats.Bedwars.games_played_bedwars,
				cosmetics: player.stats.Bedwars.packages.length,
				overall: {
					winstreak: player.stats.Bedwars.winstreak,
					wins: player.stats.Bedwars.wins_bedwars,
					losses: player.stats.Bedwars.losses_bedwars,
					WLR: +(player.stats.Bedwars.wins_bedwars / player.stats.Bedwars.losses_bedwars).toFixed(2),
					kills: player.stats.Bedwars.kills_bedwars,
					deaths: player.stats.Bedwars.deaths_bedwars,
					KDR: +(player.stats.Bedwars.kills_bedwars / player.stats.Bedwars.deaths_bedwars).toFixed(2),
					finalKills: player.stats.Bedwars.final_kills_bedwars,
					finalDeaths: player.stats.Bedwars.final_deaths_bedwars,
					FKDR: +(player.stats.Bedwars.final_kills_bedwars / player.stats.Bedwars.final_deaths_bedwars).toFixed(2),
					bedsBroken: player.stats.Bedwars.beds_broken_bedwars,
					bedsLost: player.stats.Bedwars.beds_lost_bedwars,
					BBLR: +(player.stats.Bedwars.beds_broken_bedwars / player.stats.Bedwars.beds_lost_bedwars).toFixed(2)
				},
				eight_one: {
					winstreak: player.stats.Bedwars.eight_one_winstreak,
					wins: player.stats.Bedwars.eight_one_wins_bedwars,
					losses: player.stats.Bedwars.eight_one_losses_bedwars,
					WLR: +(player.stats.Bedwars.eight_one_wins_bedwars / player.stats.Bedwars.losses_bedwars).toFixed(2),
					kills: player.stats.Bedwars.eight_one_kills_bedwars,
					deaths: player.stats.Bedwars.eight_one_deaths_bedwars,
					KDR: +(player.stats.Bedwars.eight_one_kills_bedwars / player.stats.Bedwars.eight_one_deaths_bedwars).toFixed(2),
					finalKills: player.stats.Bedwars.eight_one_final_kills_bedwars,
					finalDeaths: player.stats.Bedwars.eight_one_final_deaths_bedwars,
					FKDR: +(player.stats.Bedwars.eight_one_final_kills_bedwars / player.stats.Bedwars.eight_one_final_deaths_bedwars).toFixed(2),
					bedsBroken: player.stats.Bedwars.eight_one_beds_broken_bedwars,
					bedsLost: player.stats.Bedwars.eight_one_beds_lost_bedwars,
					BBLR: +(player.stats.Bedwars.eight_one_beds_broken_bedwars / player.stats.Bedwars.eight_one_beds_lost_bedwars).toFixed(2)
				},
				eight_two: {
					winstreak: player.stats.Bedwars.eight_two_winstreak,
					wins: player.stats.Bedwars.eight_two_wins_bedwars,
					losses: player.stats.Bedwars.eight_two_losses_bedwars,
					WLR: +(player.stats.Bedwars.eight_two_wins_bedwars / player.stats.Bedwars.eight_two_losses_bedwars).toFixed(2),
					kills: player.stats.Bedwars.eight_two_kills_bedwars,
					deaths: player.stats.Bedwars.eight_two_deaths_bedwars,
					KDR: +(player.stats.Bedwars.eight_two_kills_bedwars / player.stats.Bedwars.eight_two_deaths_bedwars).toFixed(2),
					finalKills: player.stats.Bedwars.eight_two_final_kills_bedwars,
					finalDeaths: player.stats.Bedwars.eight_two_final_deaths_bedwars,
					FKDR: +(player.stats.Bedwars.eight_two_final_kills_bedwars / player.stats.Bedwars.eight_two_final_deaths_bedwars).toFixed(2),
					bedsBroken: player.stats.Bedwars.eight_two_beds_broken_bedwars,
					bedsLost: player.stats.Bedwars.eight_two_beds_lost_bedwars,
					BBLR: +(player.stats.Bedwars.eight_two_beds_broken_bedwars / player.stats.Bedwars.eight_two_beds_lost_bedwars).toFixed(2)
				},
				four_three: {
					winstreak: player.stats.Bedwars.four_three_winstreak,
					wins: player.stats.Bedwars.four_three_wins_bedwars,
					losses: player.stats.Bedwars.four_three_losses_bedwars,
					WLR: +(player.stats.Bedwars.four_three_wins_bedwars / player.stats.Bedwars.four_three_losses_bedwars).toFixed(2),
					kills: player.stats.Bedwars.four_three_kills_bedwars,
					deaths: player.stats.Bedwars.four_three_deaths_bedwars,
					KDR: +(player.stats.Bedwars.four_three_kills_bedwars / player.stats.Bedwars.four_three_deaths_bedwars).toFixed(2),
					finalKills: player.stats.Bedwars.four_three_final_kills_bedwars,
					finalDeaths: player.stats.Bedwars.four_three_final_deaths_bedwars,
					FKDR: +(player.stats.Bedwars.four_three_final_kills_bedwars / player.stats.Bedwars.four_three_final_deaths_bedwars).toFixed(2),
					bedsBroken: player.stats.Bedwars.four_three_beds_broken_bedwars,
					bedsLost: player.stats.Bedwars.four_three_beds_lost_bedwars,
					BBLR: +(player.stats.Bedwars.four_three_beds_broken_bedwars / player.stats.Bedwars.four_three_beds_lost_bedwars).toFixed(2)
				},
				four_four: {
					winstreak: player.stats.Bedwars.four_four_winstreak,
					wins: player.stats.Bedwars.four_four_wins_bedwars,
					losses: player.stats.Bedwars.four_four_losses_bedwars,
					WLR: +(player.stats.Bedwars.four_four_wins_bedwars / player.stats.Bedwars.four_four_losses_bedwars).toFixed(2),
					kills: player.stats.Bedwars.four_four_kills_bedwars,
					deaths: player.stats.Bedwars.four_four_deaths_bedwars,
					KDR: +(player.stats.Bedwars.four_four_kills_bedwars / player.stats.Bedwars.four_four_deaths_bedwars).toFixed(2),
					finalKills: player.stats.Bedwars.four_four_final_kills_bedwars,
					finalDeaths: player.stats.Bedwars.four_four_final_deaths_bedwars,
					FKDR: +(player.stats.Bedwars.four_four_final_kills_bedwars / player.stats.Bedwars.four_four_final_deaths_bedwars).toFixed(2),
					bedsBroken: player.stats.Bedwars.four_four_beds_broken_bedwars,
					bedsLost: player.stats.Bedwars.four_four_beds_lost_bedwars,
					BBLR: +(player.stats.Bedwars.four_four_beds_broken_bedwars / player.stats.Bedwars.four_four_beds_lost_bedwars).toFixed(2)
				},
				two_four: {
					winstreak: player.stats.Bedwars.two_four_winstreak,
					wins: player.stats.Bedwars.two_four_wins_bedwars,
					losses: player.stats.Bedwars.two_four_losses_bedwars,
					WLR: +(player.stats.Bedwars.two_four_wins_bedwars / player.stats.Bedwars.two_four_losses_bedwars).toFixed(2),
					kills: player.stats.Bedwars.two_four_kills_bedwars,
					deaths: player.stats.Bedwars.two_four_deaths_bedwars,
					KDR: +(player.stats.Bedwars.two_four_kills_bedwars / player.stats.Bedwars.two_four_deaths_bedwars).toFixed(2),
					finalKills: player.stats.Bedwars.two_four_final_kills_bedwars,
					finalDeaths: player.stats.Bedwars.two_four_final_deaths_bedwars,
					FKDR: +(player.stats.Bedwars.two_four_final_kills_bedwars / player.stats.Bedwars.two_four_final_deaths_bedwars).toFixed(2),
					bedsBroken: player.stats.Bedwars.two_four_beds_broken_bedwars,
					bedsLost: player.stats.Bedwars.two_four_beds_lost_bedwars,
					BBLR: +(player.stats.Bedwars.two_four_beds_broken_bedwars / player.stats.Bedwars.two_four_beds_lost_bedwars).toFixed(2)
				},
				dream: {

				}
			} : undefined,

		}
	}

	res.status(200).send({
		success: true,
		player: formattedPlayer
	})
	// } catch (err) {
	// 	res.status(404).json({
	// 		success: false,
	// 		error: err.message
	// 	})
	// }
})

module.exports = router