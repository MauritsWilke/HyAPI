// ! Daily reward available in not showing the correct time
// ! Add all the other stats 😭
// ! Bedwars Dream Mode

const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const hy = require(`../utils/hypixel`);
const mc = require(`../utils/mojang`);

const BASE_URL = "https://api.hypixel.net";

router.use(express.json());

router.get('/', async function (req, res) {
	try {
		if (!req.query.uuid && !req.query.name) throw new Error(`Missing field(s): [uuid] or [name]`);
		let userQuery;
		if (req.query.name && !req.query.uuid) {
			const username = typeof (req.query.name) == "object" ? req.query.name[0].toLowerCase() : req.query.name.toLowerCase();
			userQuery = await mc.getUUID(username).catch(err => { throw new Error(err) })
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
			// WILL BE THEIR OWN ENDPOINT
		}

		res.status(200).send({
			success: true,
			player: formattedPlayer
		})
	} catch (err) {
		res.status(404).json({
			success: false,
			error: err.message
		})
	}
})

module.exports = router