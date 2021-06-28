const fetch = require('node-fetch');
const BASE_URL = "https://api.hypixel.net"

module.exports = {
	getPlayerStatus,
	calculatePlayerLevel,
	getPlayerStatus,
	getPlayerRank
}

const EASY_LEVELS = 4;
const EASY_LEVELS_XP = 7000;
const XP_PER_PRESTIGE = 96 * 5000 + EASY_LEVELS_XP;
const LEVELS_PER_PRESTIGE = 100;

function getPlayerRank(player) {
	if (player?.rank) return player.rank;
	if (player?.monthlyPackageRank) return "MVP++";
	if (player?.newPackageRank) return player.newPackageRank.replace(/_/, "").replace(/PLUS/, "+");
	else return "DEFAULT"
}

function calculatePlayerLevel(playerXP) {
	const exactLevel = (Math.sqrt((2 * playerXP) + 30625) / 50) - 2.5
	return +exactLevel.toFixed(2)
}

async function getPlayerStatus(uuid) {
	const response = await fetch(`${BASE_URL}/status?uuid=${uuid}&key=${process.env.HYPIXEL_API_KEY}`);
	if (!response.ok) return Promise.reject(`${response.status} ${response.statusText}`);
	const json = await response.json()
	return json.session.online
}

// TODO Calculate the total quests
// function getTotalQuests(player) {
// 	let totalQuests = 0;
// 	const quests = Object.values(player.quests);
// 	for (quest of quests) {
// 		const count = Object.keys(quest?.completions)
// 		console.log(count.length)
// 	}
// 	return totalQuests
// }