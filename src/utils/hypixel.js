const fetch = require('node-fetch');
const BASE_URL = "https://api.hypixel.net"

module.exports = {
	getPlayerStatus,
	calculatePlayerLevel,
	getPlayerStatus,
	getPlayerRank
}

/**
 * Returns the rank of a player
 * @param {object} player 
 * @returns {string} rank
 * @example 
 * // Returns a string like "MVP++", "VIP", "DEFAULT"
 * const playerRank = getPlayerRank(player)
 */
function getPlayerRank(player) {
	if (player?.rank) return player.rank;
	if (player?.monthlyPackageRank) return "MVP++";
	if (player?.newPackageRank) return player.newPackageRank.replace(/_/, "").replace(/PLUS/, "+");
	else return "DEFAULT"
}

/**
 * Returns the level of a player
 * @param {number} playerXP 
 * @returns {number} level
 * @example 
 * // Returns a positive integer
 * const playerLevel = calculatePlayerLevel(player.networkExp)
 */
function calculatePlayerLevel(playerXP) {
	const exactLevel = (Math.sqrt((2 * playerXP) + 30625) / 50) - 2.5
	return +exactLevel.toFixed(2)
}

/**
 * Returns the rank of a player
 * @async
 * @param {string} uuid 
 * @returns {bool} online
 * @example 
 * // Returns either TRUE or FALSE
 * const playerStatus = getPlayerStatus("11456473de284d36aa7b4150fe7859ab")
 */
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