const mcColours = require(`../../utils/minecraftColours.json`)
module.exports = bedwars

function bedwars(player) {
	if (!player?.stats?.Bedwars) return new Error("This player has not played Bedwars")
	const reformattedBedwars = {
		star: player.achievements.bedwars_level,
		prestige: {
			type: prestiges[Math.floor(player.achievements.bedwars_level / 100)],
			hex: prestigeColours[Math.floor(player.achievements.bedwars_level / 100)],
		},
		lootboxes: player.stats.Bedwars.bedwars_boxes,
		coins: player.stats.Bedwars.coins,
		privateGamesPlayed: player.stats.Bedwars.games_played_bedwars_1 - player.stats.Bedwars.games_played_bedwars,
		cosmetics: player.stats.Bedwars.packages.length,
		overall: {
			gamesPlayed: player.stats.Bedwars.games_played_bedwars,
			winstreak: player.stats.Bedwars.winstreak,
			wins: player.stats.Bedwars.wins_bedwars,
			losses: player.stats.Bedwars.losses_bedwars,
			kills: player.stats.Bedwars.kills_bedwars,
			deaths: player.stats.Bedwars.deaths_bedwars,
			finalKills: player.stats.Bedwars.final_kills_bedwars,
			finalDeaths: player.stats.Bedwars.final_deaths_bedwars,
			bedsBroken: player.stats.Bedwars.beds_broken_bedwars,
			bedsLost: player.stats.Bedwars.beds_lost_bedwars,
			ratios: {
				WLR: Math.round((player.stats.Bedwars.wins_bedwars / player.stats.Bedwars.losses_bedwars) * 100) / 100,
				KDR: Math.round((player.stats.Bedwars.kills_bedwars / player.stats.Bedwars.deaths_bedwars) * 100) / 100,
				FKDR: Math.round((player.stats.Bedwars.final_kills_bedwars / player.stats.Bedwars.final_deaths_bedwars) * 100) / 100,
				BBLR: Math.round((player.stats.Bedwars.beds_broken_bedwars / player.stats.Bedwars.beds_lost_bedwars) * 100) / 100
			},
			averages: {
				gamesPerStar: Math.round((player.stats.Bedwars.games_played_bedwars / player.achievements.bedwars_level) * 100) / 100,
				finalsPerGame: Math.round((player.stats.Bedwars.games_played_bedwars / player.stats.Bedwars.final_kills_bedwars) * 100) / 100,
				killsPerGame: Math.round((player.stats.Bedwars.games_played_bedwars / player.stats.Bedwars.kills_bedwars) * 100) / 100,
			},
		},
		eight_one: {
			gamesPlayed: player.stats.Bedwars.eight_one_games_played_bedwars,
			winstreak: player.stats.Bedwars.eight_one_winstreak,
			wins: player.stats.Bedwars.eight_one_wins_bedwars,
			losses: player.stats.Bedwars.eight_one_losses_bedwars,
			kills: player.stats.Bedwars.eight_one_kills_bedwars,
			deaths: player.stats.Bedwars.eight_one_deaths_bedwars,
			finalKills: player.stats.Bedwars.eight_one_final_kills_bedwars,
			finalDeaths: player.stats.Bedwars.eight_one_final_deaths_bedwars,
			bedsBroken: player.stats.Bedwars.eight_one_beds_broken_bedwars,
			bedsLost: player.stats.Bedwars.eight_one_beds_lost_bedwars,
			rations: {
				WLR: Math.round((player.stats.Bedwars.eight_one_wins_bedwars / player.stats.Bedwars.losses_bedwars) * 100) / 100,
				KDR: Math.round((player.stats.Bedwars.eight_one_kills_bedwars / player.stats.Bedwars.eight_one_deaths_bedwars) * 100) / 100,
				FKDR: Math.round((player.stats.Bedwars.eight_one_final_kills_bedwars / player.stats.Bedwars.eight_one_final_deaths_bedwars) * 100) / 100,
				BBLR: Math.round((player.stats.Bedwars.eight_one_beds_broken_bedwars / player.stats.Bedwars.eight_one_beds_lost_bedwars) * 100) / 100
			},
			averages: {
				finalsPerGame: Math.round((player.stats.Bedwars.eight_one_games_played_bedwars / player.stats.Bedwars.eight_one_final_kills_bedwars) * 100) / 100,
				killsPerGame: Math.round((player.stats.Bedwars.eight_one_games_played_bedwars / player.stats.Bedwars.eight_one_kills_bedwars) * 100) / 100,
			},
		},
		eight_two: {
			gamesPlayed: player.stats.Bedwars.eight_two_games_played_bedwars,
			winstreak: player.stats.Bedwars.eight_two_winstreak,
			wins: player.stats.Bedwars.eight_two_wins_bedwars,
			losses: player.stats.Bedwars.eight_two_losses_bedwars,
			kills: player.stats.Bedwars.eight_two_kills_bedwars,
			deaths: player.stats.Bedwars.eight_two_deaths_bedwars,
			finalKills: player.stats.Bedwars.eight_two_final_kills_bedwars,
			finalDeaths: player.stats.Bedwars.eight_two_final_deaths_bedwars,
			bedsBroken: player.stats.Bedwars.eight_two_beds_broken_bedwars,
			bedsLost: player.stats.Bedwars.eight_two_beds_lost_bedwars,
			rations: {
				WLR: Math.round((player.stats.Bedwars.eight_two_wins_bedwars / player.stats.Bedwars.eight_two_losses_bedwars) * 100) / 100,
				KDR: Math.round((player.stats.Bedwars.eight_two_kills_bedwars / player.stats.Bedwars.eight_two_deaths_bedwars) * 100) / 100,
				FKDR: Math.round((player.stats.Bedwars.eight_two_final_kills_bedwars / player.stats.Bedwars.eight_two_final_deaths_bedwars) * 100) / 100,
				BBLR: Math.round((player.stats.Bedwars.eight_two_beds_broken_bedwars / player.stats.Bedwars.eight_two_beds_lost_bedwars) * 100) / 100
			},
			averages: {
				finalsPerGame: Math.round((player.stats.Bedwars.eight_one_games_played_bedwars / player.stats.Bedwars.eight_two_final_kills_bedwars) * 100) / 100,
				killsPerGame: Math.round((player.stats.Bedwars.eight_one_games_played_bedwars / player.stats.Bedwars.eight_two_kills_bedwars) * 100) / 100,
			},
		},
		four_three: {
			gamesPlayed: player.stats.Bedwars.four_three_games_played_bedwars,
			winstreak: player.stats.Bedwars.four_three_winstreak,
			wins: player.stats.Bedwars.four_three_wins_bedwars,
			losses: player.stats.Bedwars.four_three_losses_bedwars,
			kills: player.stats.Bedwars.four_three_kills_bedwars,
			deaths: player.stats.Bedwars.four_three_deaths_bedwars,
			finalKills: player.stats.Bedwars.four_three_final_kills_bedwars,
			finalDeaths: player.stats.Bedwars.four_three_final_deaths_bedwars,
			bedsBroken: player.stats.Bedwars.four_three_beds_broken_bedwars,
			bedsLost: player.stats.Bedwars.four_three_beds_lost_bedwars,
			rations: {
				WLR: Math.round((player.stats.Bedwars.four_three_wins_bedwars / player.stats.Bedwars.four_three_losses_bedwars) * 100) / 100,
				KDR: Math.round((player.stats.Bedwars.four_three_kills_bedwars / player.stats.Bedwars.four_three_deaths_bedwars) * 100) / 100,
				FKDR: Math.round((player.stats.Bedwars.four_three_final_kills_bedwars / player.stats.Bedwars.four_three_final_deaths_bedwars) * 100) / 100,
				BBLR: Math.round((player.stats.Bedwars.four_three_beds_broken_bedwars / player.stats.Bedwars.four_three_beds_lost_bedwars) * 100) / 100
			},
			averages: {
				finalsPerGame: Math.round((player.stats.Bedwars.eight_one_games_played_bedwars / player.stats.Bedwars.four_three_final_kills_bedwars) * 100) / 100,
				killsPerGame: Math.round((player.stats.Bedwars.eight_one_games_played_bedwars / player.stats.Bedwars.four_three_kills_bedwars) * 100) / 100,
			},
		},
		four_four: {
			gamesPlayed: player.stats.Bedwars.four_four_games_played_bedwars,
			winstreak: player.stats.Bedwars.four_four_winstreak,
			wins: player.stats.Bedwars.four_four_wins_bedwars,
			losses: player.stats.Bedwars.four_four_losses_bedwars,
			kills: player.stats.Bedwars.four_four_kills_bedwars,
			deaths: player.stats.Bedwars.four_four_deaths_bedwars,
			finalKills: player.stats.Bedwars.four_four_final_kills_bedwars,
			finalDeaths: player.stats.Bedwars.four_four_final_deaths_bedwars,
			bedsBroken: player.stats.Bedwars.four_four_beds_broken_bedwars,
			bedsLost: player.stats.Bedwars.four_four_beds_lost_bedwars,
			rations: {
				WLR: Math.round((player.stats.Bedwars.four_four_wins_bedwars / player.stats.Bedwars.four_four_losses_bedwars) * 100) / 100,
				KDR: Math.round((player.stats.Bedwars.four_four_kills_bedwars / player.stats.Bedwars.four_four_deaths_bedwars) * 100) / 100,
				FKDR: Math.round((player.stats.Bedwars.four_four_final_kills_bedwars / player.stats.Bedwars.four_four_final_deaths_bedwars) * 100) / 100,
				BBLR: Math.round((player.stats.Bedwars.four_four_beds_broken_bedwars / player.stats.Bedwars.four_four_beds_lost_bedwars) * 100) / 100
			},
			averages: {
				finalsPerGame: Math.round((player.stats.Bedwars.eight_one_games_played_bedwars / player.stats.Bedwars.four_four_final_kills_bedwars) * 100) / 100,
				killsPerGame: Math.round((player.stats.Bedwars.eight_one_games_played_bedwars / player.stats.Bedwars.four_four_kills_bedwars) * 100) / 100,
			},
		},
		two_four: {
			gamesPlayed: player.stats.Bedwars.two_four_games_played_bedwars,
			winstreak: player.stats.Bedwars.two_four_winstreak,
			wins: player.stats.Bedwars.two_four_wins_bedwars,
			losses: player.stats.Bedwars.two_four_losses_bedwars,
			kills: player.stats.Bedwars.two_four_kills_bedwars,
			deaths: player.stats.Bedwars.two_four_deaths_bedwars,
			finalKills: player.stats.Bedwars.two_four_final_kills_bedwars,
			finalDeaths: player.stats.Bedwars.two_four_final_deaths_bedwars,
			bedsBroken: player.stats.Bedwars.two_four_beds_broken_bedwars,
			bedsLost: player.stats.Bedwars.two_four_beds_lost_bedwars,
			rations: {
				WLR: Math.round((player.stats.Bedwars.two_four_wins_bedwars / player.stats.Bedwars.two_four_losses_bedwars) * 100) / 100,
				KDR: Math.round((player.stats.Bedwars.two_four_kills_bedwars / player.stats.Bedwars.two_four_deaths_bedwars) * 100) / 100,
				FKDR: Math.round((player.stats.Bedwars.two_four_final_kills_bedwars / player.stats.Bedwars.two_four_final_deaths_bedwars) * 100) / 100,
				BBLR: Math.round((player.stats.Bedwars.two_four_beds_broken_bedwars / player.stats.Bedwars.two_four_beds_lost_bedwars) * 100) / 100
			},
			averages: {
				finalsPerGame: Math.round((player.stats.Bedwars.eight_one_games_played_bedwars / player.stats.Bedwars.two_four_final_kills_bedwars) * 100) / 100,
				killsPerGame: Math.round((player.stats.Bedwars.eight_one_games_played_bedwars / player.stats.Bedwars.two_four_kills_bedwars) * 100) / 100,
			},
		},
		dream: {

		}
	}
	return reformattedBedwars
}

const prestiges = {
	1: "iron",
	2: "gold",
	3: "diamond",
	4: "emerald",
	5: "sapphire",
	6: "ruby",
	7: "crystal",
	8: "opal",
	9: "amethyst",
	10: "rainbow",
	11: "iron prime",
	12: "gold prime",
	13: "diamond prime",
	14: "emerald prime",
	15: "sapphire prime",
	16: "ruby prime",
	17: "crystal prime",
	18: "opal prime",
	19: "amethyst prime",
	20: "mirror",
	21: "light",
	22: "dawn",
	23: "dusk",
	24: "air",
	25: "wind",
	26: "nebula",
	27: "thunder",
	28: "earth",
	29: "water",
	30: "fire"
}

const prestigeColours = {
	0: mcColours.gray,
	1: mcColours.white,
	2: mcColours.gold,
	3: mcColours.aqua,
	4: mcColours.dark_green,
	5: mcColours.dark_aqua,
	6: mcColours.dark_red,
	7: mcColours.light_purple,
	8: mcColours.blue,
	9: mcColours.dark_purple,
	10: {
		0: mcColours.gold,
		1: mcColours.yellow,
		2: mcColours.green,
		3: mcColours.aqua,
	},
	11: "#FAFAFA",
	12: "#FFAA00",
	13: "#55FFFF",
	14: "#00AA00",
	15: "#00AAAA",
	16: "#AA0000",
	17: "#FF55FF",
	18: "#5555FF",
	19: "#AA00AA",
	20: {
		0: mcColours.gray,
		1: mcColours.white,
		2: mcColours.white,
		3: mcColours.gray
	},
	21: {
		0: mcColours.white,
		1: mcColours.yellow,
		2: mcColours.yellow,
		3: mcColours.gold
	},
	22: {
		0: mcColours.gold,
		1: mcColours.white,
		2: mcColours.white,
		3: mcColours.aqua
	},
	23: {
		0: mcColours.dark_purple,
		1: mcColours.light_purple,
		2: mcColours.light_purple,
		3: mcColours.gold
	},
	24: {
		0: mcColours.aqua,
		1: mcColours.white,
		2: mcColours.white,
		3: mcColours.gray,
	},
	25: {
		0: mcColours.white,
		1: mcColours.green,
		2: mcColours.green,
		3: mcColours.dark_green
	},
	26: {
		0: mcColours.dark_red,
		1: mcColours.red,
		2: mcColours.red,
		3: mcColours.light_purple,
	},
	27: {
		0: mcColours.yellow,
		1: mcColours.white,
		2: mcColours.white,
		3: mcColours.dark_gray
	},
	28: {
		0: mcColours.green,
		1: mcColours.dark_green,
		2: mcColours.dark_green,
		3: mcColours.gold
	},
	29: {
		0: mcColours.aqua,
		1: mcColours.dark_aqua,
		2: mcColours.dark_aqua,
		3: mcColours.blue
	},
	30: {
		0: mcColours.yellow,
		1: mcColours.gold,
		2: mcColours.gold,
		3: mcColours.red
	}
}