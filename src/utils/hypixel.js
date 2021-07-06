const fetch = require('node-fetch');
const BASE_URL = "https://api.hypixel.net"

module.exports = {
	getPlayerStatus,
	calculatePlayerLevel,
	getPlayerStatus,
	getPlayerRank,
	getGuildLevel
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

/**
 * Returns the exact guild level of a player
 * @param {number} exp 
 * @returns {number} level
 * @example 
 * // Returns 1
 * const guildLevel = getGuildLevel(247843)
 */
function getGuildLevel(exp) {
	if (exp < 100000) return 0
	if (exp < 250000) return 1
	if (exp < 500000) return 2
	if (exp < 1000000) return 3
	if (exp < 1750000) return 4
	if (exp < 2750000) return 5
	if (exp < 4000000) return 6
	if (exp < 5500000) return 7
	if (exp < 7500000) return 8
	if (exp >= 7500000) return exp < 15000000 ? Math.floor((exp - 7500000) / 2500000) + 9 : Math.floor((exp - 15000000) / 3000000) + 12
	return new Error("Something went wrong calculating the guild level")
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