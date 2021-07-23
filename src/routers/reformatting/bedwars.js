const mcColours = require(`../../utils/minecraftColours.json`)
const utils = require(`../../utils/utils`)
module.exports = bedwars

function bedwars(player) {
	if (!player?.stats?.Bedwars) return new Error("This player has not played Bedwars")
	const bw = player.stats.Bedwars
	const reformattedBedwars = {
		star: player.achievements.bedwars_level,
		suffix: returnSuffix(player.achievements.bedwars_level),
		prestige: {
			type: prestiges[Math.floor(player.achievements.bedwars_level / 100)],
			hex: prestigeColours[Math.floor(player.achievements.bedwars_level / 100)],
		},
		lootboxes: bw.bedwars_boxes,
		coins: bw.coins,
		gamesPlayed: bw.games_played_bedwars,
		privateGamesPlayed: bw.games_played_bedwars_1 - bw.games_played_bedwars,
		cosmetics: bw.packages.length,
		overall: {
			gamesPlayed: bw.games_played_bedwars,
			winstreak: bw.winstreak,
			wins: bw.wins_bedwars,
			losses: bw.losses_bedwars,
			kills: bw.kills_bedwars,
			deaths: bw.deaths_bedwars,
			finalKills: bw.final_kills_bedwars,
			finalDeaths: bw.final_deaths_bedwars,
			bedsBroken: bw.beds_broken_bedwars,
			bedsLost: bw.beds_lost_bedwars,
			ratios: {
				WLR: Math.round((bw.wins_bedwars / bw.losses_bedwars) * 100) / 100 || 0,
				KDR: Math.round((bw.kills_bedwars / bw.deaths_bedwars) * 100) / 100 || 0,
				FKDR: Math.round((bw.final_kills_bedwars / bw.final_deaths_bedwars) * 100) / 100 || 0,
				BBLR: Math.round((bw.beds_broken_bedwars / bw.beds_lost_bedwars) * 100) / 100 || 0
			},
			averages: {
				gamesPerStar: Math.round((bw.games_played_bedwars / player.achievements.bedwars_level) * 100) / 100 || 0,
				finalsPerGame: Math.round((bw.games_played_bedwars / bw.final_kills_bedwars) * 100) / 100 || 0,
				killsPerGame: Math.round((bw.games_played_bedwars / bw.kills_bedwars) * 100) / 100,
			},
		},
		eight_one: bw.eight_one_games_played_bedwars > 0 ? {
			gamesPlayed: bw.eight_one_games_played_bedwars,
			winstreak: bw.eight_one_winstreak,
			wins: bw.eight_one_wins_bedwars,
			losses: bw.eight_one_losses_bedwars,
			kills: bw.eight_one_kills_bedwars,
			deaths: bw.eight_one_deaths_bedwars,
			finalKills: bw.eight_one_final_kills_bedwars,
			finalDeaths: bw.eight_one_final_deaths_bedwars,
			bedsBroken: bw.eight_one_beds_broken_bedwars,
			bedsLost: bw.eight_one_beds_lost_bedwars,
			ratios: {
				WLR: Math.round((bw.eight_one_wins_bedwars / bw.eight_one_losses_bedwars) * 100) / 100 || 0,
				KDR: Math.round((bw.eight_one_kills_bedwars / bw.eight_one_deaths_bedwars) * 100) / 100 || 0,
				FKDR: Math.round((bw.eight_one_final_kills_bedwars / bw.eight_one_final_deaths_bedwars) * 100) / 100 || 0,
				BBLR: Math.round((bw.eight_one_beds_broken_bedwars / bw.eight_one_beds_lost_bedwars) * 100) / 100 || 0
			},
			averages: {
				finalsPerGame: Math.round((bw.eight_one_games_played_bedwars / bw.eight_one_final_kills_bedwars) * 100) / 100 || 0,
				killsPerGame: Math.round((bw.eight_one_games_played_bedwars / bw.eight_one_kills_bedwars) * 100) / 100 || 0,
			},
		} : null,
		eight_two: bw.eight_two_games_played_bedwars > 0 ? {
			gamesPlayed: bw.eight_two_games_played_bedwars,
			winstreak: bw.eight_two_winstreak,
			wins: bw.eight_two_wins_bedwars,
			losses: bw.eight_two_losses_bedwars,
			kills: bw.eight_two_kills_bedwars,
			deaths: bw.eight_two_deaths_bedwars,
			finalKills: bw.eight_two_final_kills_bedwars,
			finalDeaths: bw.eight_two_final_deaths_bedwars,
			bedsBroken: bw.eight_two_beds_broken_bedwars,
			bedsLost: bw.eight_two_beds_lost_bedwars,
			ratios: {
				WLR: Math.round((bw.eight_two_wins_bedwars / bw.eight_two_losses_bedwars) * 100) / 100 || 0,
				KDR: Math.round((bw.eight_two_kills_bedwars / bw.eight_two_deaths_bedwars) * 100) / 100 || 0,
				FKDR: Math.round((bw.eight_two_final_kills_bedwars / bw.eight_two_final_deaths_bedwars) * 100) / 100 || 0,
				BBLR: Math.round((bw.eight_two_beds_broken_bedwars / bw.eight_two_beds_lost_bedwars) * 100) / 100 || 0
			},
			averages: {
				finalsPerGame: Math.round((bw.eight_two_games_played_bedwars / bw.eight_two_final_kills_bedwars) * 100) / 100 || 0,
				killsPerGame: Math.round((bw.eight_two_games_played_bedwars / bw.eight_two_kills_bedwars) * 100) / 100 || 0,
			},
		} : null,
		four_three: bw.four_three_games_played_bedwars ? {
			gamesPlayed: bw.four_three_games_played_bedwars,
			winstreak: bw.four_three_winstreak,
			wins: bw.four_three_wins_bedwars,
			losses: bw.four_three_losses_bedwars,
			kills: bw.four_three_kills_bedwars,
			deaths: bw.four_three_deaths_bedwars,
			finalKills: bw.four_three_final_kills_bedwars,
			finalDeaths: bw.four_three_final_deaths_bedwars,
			bedsBroken: bw.four_three_beds_broken_bedwars,
			bedsLost: bw.four_three_beds_lost_bedwars,
			ratios: {
				WLR: Math.round((bw.four_three_wins_bedwars / bw.four_three_losses_bedwars) * 100) / 100 || 0,
				KDR: Math.round((bw.four_three_kills_bedwars / bw.four_three_deaths_bedwars) * 100) / 100 || 0,
				FKDR: Math.round((bw.four_three_final_kills_bedwars / bw.four_three_final_deaths_bedwars) * 100) / 100 || 0,
				BBLR: Math.round((bw.four_three_beds_broken_bedwars / bw.four_three_beds_lost_bedwars) * 100) / 100 || 0
			},
			averages: {
				finalsPerGame: Math.round((bw.four_three_games_played_bedwars / bw.four_three_final_kills_bedwars) * 100) / 100 || 0,
				killsPerGame: Math.round((bw.four_three_games_played_bedwars / bw.four_three_kills_bedwars) * 100) / 100 || 0,
			},
		} : null,
		four_four: bw.four_four_games_played_bedwars ? {
			gamesPlayed: bw.four_four_games_played_bedwars,
			winstreak: bw.four_four_winstreak,
			wins: bw.four_four_wins_bedwars,
			losses: bw.four_four_losses_bedwars,
			kills: bw.four_four_kills_bedwars,
			deaths: bw.four_four_deaths_bedwars,
			finalKills: bw.four_four_final_kills_bedwars,
			finalDeaths: bw.four_four_final_deaths_bedwars,
			bedsBroken: bw.four_four_beds_broken_bedwars,
			bedsLost: bw.four_four_beds_lost_bedwars,
			ratios: {
				WLR: Math.round((bw.four_four_wins_bedwars / bw.four_four_losses_bedwars) * 100) / 100 || 0,
				KDR: Math.round((bw.four_four_kills_bedwars / bw.four_four_deaths_bedwars) * 100) / 100 || 0,
				FKDR: Math.round((bw.four_four_final_kills_bedwars / bw.four_four_final_deaths_bedwars) * 100) / 100 || 0,
				BBLR: Math.round((bw.four_four_beds_broken_bedwars / bw.four_four_beds_lost_bedwars) * 100) / 100 || 0
			},
			averages: {
				finalsPerGame: Math.round((bw.four_four_games_played_bedwars / bw.four_four_final_kills_bedwars) * 100) / 100 || 0,
				killsPerGame: Math.round((bw.four_four_games_played_bedwars / bw.four_four_kills_bedwars) * 100) / 100 || 0,
			},
		} : null,
		two_four: bw.two_four_games_played_bedwars ? {
			gamesPlayed: bw.two_four_games_played_bedwars,
			winstreak: bw.two_four_winstreak,
			wins: bw.two_four_wins_bedwars,
			losses: bw.two_four_losses_bedwars,
			kills: bw.two_four_kills_bedwars,
			deaths: bw.two_four_deaths_bedwars,
			finalKills: bw.two_four_final_kills_bedwars,
			finalDeaths: bw.two_four_final_deaths_bedwars,
			bedsBroken: bw.two_four_beds_broken_bedwars,
			bedsLost: bw.two_four_beds_lost_bedwars,
			ratios: {
				WLR: Math.round((bw.two_four_wins_bedwars / bw.two_four_losses_bedwars) * 100) / 100 || 0,
				KDR: Math.round((bw.two_four_kills_bedwars / bw.two_four_deaths_bedwars) * 100) / 100 || 0,
				FKDR: Math.round((bw.two_four_final_kills_bedwars / bw.two_four_final_deaths_bedwars) * 100) / 100 || 0,
				BBLR: Math.round((bw.two_four_beds_broken_bedwars / bw.two_four_beds_lost_bedwars) * 100) / 100 || 0
			},
			averages: {
				finalsPerGame: Math.round((bw.two_four_games_played_bedwars / bw.two_four_final_kills_bedwars) * 100) / 100 || 0,
				killsPerGame: Math.round((bw.two_four_games_played_bedwars / bw.two_four_kills_bedwars) * 100) / 100 || 0,
			},
		} : null,
		dream: {
			armed: bw.eight_two_armed_games_played_bedwars + bw.four_four_armed_games_played_bedwars > 0 ? {
				eight_two: bw.eight_two_armed_games_played_bedwars > 0 ? {
					gamesPlayed: bw.eight_two_armed_games_played_bedwars,
					winstreak: bw.eight_two_armed_winstreak,
					wins: bw.eight_two_armed_wins_bedwars,
					losses: bw.eight_two_armed_losses_bedwars,
					kills: bw.eight_two_armed_kills_bedwars,
					deaths: bw.eight_two_armed_deaths_bedwars,
					finalKills: bw.eight_two_armed_final_kills_bedwars,
					finalDeaths: bw.eight_two_armed_final_deaths_bedwars,
					bedsBroken: bw.eight_two_armed_beds_broken_bedwars,
					bedsLost: bw.eight_two_armed_beds_lost_bedwars,
					ratios: {
						WLR: Math.round((bw.eight_two_armed_wins_bedwars / bw.losses_bedwars) * 100) / 100 || 0,
						KDR: Math.round((bw.eight_two_armed_kills_bedwars / bw.eight_two_armed_deaths_bedwars) || 0 * 100) / 100,
						FKDR: Math.round((bw.eight_two_armed_final_kills_bedwars / bw.eight_two_armed_final_deaths_bedwars) * 100 || 0) / 100,
						BBLR: Math.round((bw.eight_two_armed_beds_broken_bedwars / bw.eight_two_armed_beds_lost_bedwars) * 100) / 100 || 0
					},
					averages: {
						finalsPerGame: Math.round((bw.eight_two_armed_games_played_bedwars / bw.eight_two_armed_final_kills_bedwars) * 100) / 100 || 0,
						killsPerGame: Math.round((bw.eight_two_armed_games_played_bedwars / bw.eight_two_armed_kills_bedwars) * 100) / 100 || 0,
					},
				} : null,
				four_four: bw.four_four_armed_games_played_bedwars > 0 ? {
					gamesPlayed: bw.four_four_armed_games_played_bedwars,
					winstreak: bw.four_four_armed_winstreak,
					wins: bw.four_four_armed_wins_bedwars,
					losses: bw.four_four_armed_losses_bedwars,
					kills: bw.four_four_armed_kills_bedwars,
					deaths: bw.four_four_armed_deaths_bedwars,
					finalKills: bw.four_four_armed_final_kills_bedwars,
					finalDeaths: bw.four_four_armed_final_deaths_bedwars,
					bedsBroken: bw.four_four_armed_beds_broken_bedwars,
					bedsLost: bw.four_four_armed_beds_lost_bedwars,
					ratios: {
						WLR: Math.round((bw.four_four_armed_wins_bedwars / bw.four_four_armed_losses_bedwars) * 100) / 100 || 0,
						KDR: Math.round((bw.four_four_armed_kills_bedwars / bw.four_four_armed_deaths_bedwars) * 100) / 100 || 0,
						FKDR: Math.round((bw.four_four_armed_final_kills_bedwars / bw.four_four_armed_final_deaths_bedwars) * 100) / 100 || 0,
						BBLR: Math.round((bw.four_four_armed_beds_broken_bedwars / bw.four_four_armed_beds_lost_bedwars) * 100) / 100 || 0
					},
					averages: {
						finalsPerGame: Math.round((bw.four_four_armed_games_played_bedwars / bw.four_four_armed_final_kills_bedwars) * 100) / 100 || 0,
						killsPerGame: Math.round((bw.four_four_armed_games_played_bedwars / bw.four_four_armed_kills_bedwars) * 100) / 100 || 0,
					},
				} : null,
			} : null,
			castle: bw.castle_games_played_bedwars > 0 ? {
				gamesPlayed: bw.castle_games_played_bedwars,
				winstreak: bw.castle_winstreak,
				wins: bw.castle_wins_bedwars,
				losses: bw.castle_losses_bedwars,
				kills: bw.castle_kills_bedwars,
				deaths: bw.castle_deaths_bedwars,
				finalKills: bw.castle_final_kills_bedwars,
				finalDeaths: bw.castle_final_deaths_bedwars,
				bedsBroken: bw.castle_beds_broken_bedwars,
				bedsLost: bw.castle_beds_lost_bedwars,
				ratios: {
					WLR: Math.round((bw.castle_wins_bedwars / bw.losses_bedwars) * 100) / 100 || 0,
					KDR: Math.round((bw.castle_kills_bedwars / bw.castle_deaths_bedwars) * 100) / 100 || 0,
					FKDR: Math.round((bw.castle_final_kills_bedwars / bw.castle_final_deaths_bedwars) * 100) / 100 || 0,
					BBLR: Math.round((bw.castle_beds_broken_bedwars / bw.castle_beds_lost_bedwars) * 100) / 100 || 0
				},
				averages: {
					finalsPerGame: Math.round((bw.castle_games_played_bedwars / bw.castle_final_kills_bedwars) * 100) / 100 || 0,
					killsPerGame: Math.round((bw.castle_games_played_bedwars / bw.castle_kills_bedwars) * 100) / 100 || 0,
				},
			} : null,
			luckyBlocks: bw.eight_two_lucky_games_played_bedwars + bw.four_four_lucky_games_played_bedwars > 0 ? {
				eight_two: bw.eight_two_lucky_games_played_bedwars > 0 ? {
					gamesPlayed: bw.eight_two_lucky_games_played_bedwars,
					winstreak: bw.eight_two_lucky_winstreak,
					wins: bw.eight_two_lucky_wins_bedwars,
					losses: bw.eight_two_lucky_losses_bedwars,
					kills: bw.eight_two_lucky_kills_bedwars,
					deaths: bw.eight_two_lucky_deaths_bedwars,
					finalKills: bw.eight_two_lucky_final_kills_bedwars,
					finalDeaths: bw.eight_two_lucky_final_deaths_bedwars,
					bedsBroken: bw.eight_two_lucky_beds_broken_bedwars,
					bedsLost: bw.eight_two_lucky_beds_lost_bedwars,
					ratios: {
						WLR: Math.round((bw.eight_two_lucky_wins_bedwars / bw.losses_bedwars) * 100) / 100 || 0,
						KDR: Math.round((bw.eight_two_lucky_kills_bedwars / bw.eight_two_lucky_deaths_bedwars) || 0 * 100) / 100,
						FKDR: Math.round((bw.eight_two_lucky_final_kills_bedwars / bw.eight_two_lucky_final_deaths_bedwars) * 100 || 0) / 100,
						BBLR: Math.round((bw.eight_two_lucky_beds_broken_bedwars / bw.eight_two_lucky_beds_lost_bedwars) * 100) / 100 || 0
					},
					averages: {
						finalsPerGame: Math.round((bw.eight_two_lucky_games_played_bedwars / bw.eight_two_lucky_final_kills_bedwars) * 100) / 100 || 0,
						killsPerGame: Math.round((bw.eight_two_lucky_games_played_bedwars / bw.eight_two_lucky_kills_bedwars) * 100) / 100 || 0,
					},
				} : null,
				four_four: bw.four_four_lucky_games_played_bedwars > 0 ? {
					gamesPlayed: bw.four_four_lucky_games_played_bedwars,
					winstreak: bw.four_four_lucky_winstreak,
					wins: bw.four_four_lucky_wins_bedwars,
					losses: bw.four_four_lucky_losses_bedwars,
					kills: bw.four_four_lucky_kills_bedwars,
					deaths: bw.four_four_lucky_deaths_bedwars,
					finalKills: bw.four_four_lucky_final_kills_bedwars,
					finalDeaths: bw.four_four_lucky_final_deaths_bedwars,
					bedsBroken: bw.four_four_lucky_beds_broken_bedwars,
					bedsLost: bw.four_four_lucky_beds_lost_bedwars,
					ratios: {
						WLR: Math.round((bw.four_four_lucky_wins_bedwars / bw.four_four_lucky_losses_bedwars) * 100) / 100 || 0,
						KDR: Math.round((bw.four_four_lucky_kills_bedwars / bw.four_four_lucky_deaths_bedwars) * 100) / 100 || 0,
						FKDR: Math.round((bw.four_four_lucky_final_kills_bedwars / bw.four_four_lucky_final_deaths_bedwars) * 100) / 100 || 0,
						BBLR: Math.round((bw.four_four_lucky_beds_broken_bedwars / bw.four_four_lucky_beds_lost_bedwars) * 100) / 100 || 0
					},
					averages: {
						finalsPerGame: Math.round((bw.four_four_lucky_games_played_bedwars / bw.four_four_lucky_final_kills_bedwars) * 100) / 100 || 0,
						killsPerGame: Math.round((bw.four_four_lucky_games_played_bedwars / bw.four_four_lucky_kills_bedwars) * 100) / 100 || 0,
					},
				} : null,
			} : null,
			rush: bw.eight_two_rush_games_played_bedwars + bw.four_four_rush_games_played_bedwars > 0 ? {
				eight_two: bw.eight_two_rush_games_played_bedwars > 0 ? {
					gamesPlayed: bw.eight_two_rush_games_played_bedwars,
					winstreak: bw.eight_two_rush_winstreak,
					wins: bw.eight_two_rush_wins_bedwars,
					losses: bw.eight_two_rush_losses_bedwars,
					kills: bw.eight_two_rush_kills_bedwars,
					deaths: bw.eight_two_rush_deaths_bedwars,
					finalKills: bw.eight_two_rush_final_kills_bedwars,
					finalDeaths: bw.eight_two_rush_final_deaths_bedwars,
					bedsBroken: bw.eight_two_rush_beds_broken_bedwars,
					bedsLost: bw.eight_two_rush_beds_lost_bedwars,
					ratios: {
						WLR: Math.round((bw.eight_two_rush_wins_bedwars / bw.losses_bedwars) * 100) / 100 || 0,
						KDR: Math.round((bw.eight_two_rush_kills_bedwars / bw.eight_two_rush_deaths_bedwars) || 0 * 100) / 100,
						FKDR: Math.round((bw.eight_two_rush_final_kills_bedwars / bw.eight_two_rush_final_deaths_bedwars) * 100 || 0) / 100,
						BBLR: Math.round((bw.eight_two_rush_beds_broken_bedwars / bw.eight_two_rush_beds_lost_bedwars) * 100) / 100 || 0
					},
					averages: {
						finalsPerGame: Math.round((bw.eight_two_rush_games_played_bedwars / bw.eight_two_rush_final_kills_bedwars) * 100) / 100 || 0,
						killsPerGame: Math.round((bw.eight_two_rush_games_played_bedwars / bw.eight_two_rush_kills_bedwars) * 100) / 100 || 0,
					},
				} : null,
				four_four: bw.four_four_rush_games_played_bedwars > 0 ? {
					gamesPlayed: bw.four_four_rush_games_played_bedwars,
					winstreak: bw.four_four_rush_winstreak,
					wins: bw.four_four_rush_wins_bedwars,
					losses: bw.four_four_rush_losses_bedwars,
					kills: bw.four_four_rush_kills_bedwars,
					deaths: bw.four_four_rush_deaths_bedwars,
					finalKills: bw.four_four_rush_final_kills_bedwars,
					finalDeaths: bw.four_four_rush_final_deaths_bedwars,
					bedsBroken: bw.four_four_rush_beds_broken_bedwars,
					bedsLost: bw.four_four_rush_beds_lost_bedwars,
					ratios: {
						WLR: Math.round((bw.four_four_rush_wins_bedwars / bw.four_four_rush_losses_bedwars) * 100) / 100 || 0,
						KDR: Math.round((bw.four_four_rush_kills_bedwars / bw.four_four_rush_deaths_bedwars) * 100) / 100 || 0,
						FKDR: Math.round((bw.four_four_rush_final_kills_bedwars / bw.four_four_rush_final_deaths_bedwars) * 100) / 100 || 0,
						BBLR: Math.round((bw.four_four_rush_beds_broken_bedwars / bw.four_four_rush_beds_lost_bedwars) * 100) / 100 || 0
					},
					averages: {
						finalsPerGame: Math.round((bw.four_four_rush_games_played_bedwars / bw.four_four_rush_final_kills_bedwars) * 100) / 100 || 0,
						killsPerGame: Math.round((bw.four_four_rush_games_played_bedwars / bw.four_four_rush_kills_bedwars) * 100) / 100 || 0,
					},
				} : null,
			} : null,
			ultimate: bw.eight_two_ultimate_games_played_bedwars + bw.four_four_ultimate_games_played_bedwars > 0 ? {
				eight_two: bw.eight_two_ultimate_games_played_bedwars > 0 ? {
					gamesPlayed: bw.eight_two_ultimate_games_played_bedwars,
					winstreak: bw.eight_two_ultimate_winstreak,
					wins: bw.eight_two_ultimate_wins_bedwars,
					losses: bw.eight_two_ultimate_losses_bedwars,
					kills: bw.eight_two_ultimate_kills_bedwars,
					deaths: bw.eight_two_ultimate_deaths_bedwars,
					finalKills: bw.eight_two_ultimate_final_kills_bedwars,
					finalDeaths: bw.eight_two_ultimate_final_deaths_bedwars,
					bedsBroken: bw.eight_two_ultimate_beds_broken_bedwars,
					bedsLost: bw.eight_two_ultimate_beds_lost_bedwars,
					ratios: {
						WLR: Math.round((bw.eight_two_ultimate_wins_bedwars / bw.losses_bedwars) * 100) / 100 || 0,
						KDR: Math.round((bw.eight_two_ultimate_kills_bedwars / bw.eight_two_ultimate_deaths_bedwars) * 100) / 100 || 0,
						FKDR: Math.round((bw.eight_two_ultimate_final_kills_bedwars / bw.eight_two_ultimate_final_deaths_bedwars) * 100) / 100 || 0,
						BBLR: Math.round((bw.eight_two_ultimate_beds_broken_bedwars / bw.eight_two_ultimate_beds_lost_bedwars) * 100) / 100 || 0
					},
					averages: {
						finalsPerGame: Math.round((bw.eight_two_ultimate_games_played_bedwars / bw.eight_two_ultimate_final_kills_bedwars) * 100) / 100 || 0,
						killsPerGame: Math.round((bw.eight_two_ultimate_games_played_bedwars / bw.eight_two_ultimate_kills_bedwars) * 100) / 100 || 0,
					},
				} : null,
				four_four: bw.four_four_ultimate_games_played_bedwars > 0 ? {
					gamesPlayed: bw.four_four_ultimate_games_played_bedwars,
					winstreak: bw.four_four_ultimate_winstreak,
					wins: bw.four_four_ultimate_wins_bedwars,
					losses: bw.four_four_ultimate_losses_bedwars,
					kills: bw.four_four_ultimate_kills_bedwars,
					deaths: bw.four_four_ultimate_deaths_bedwars,
					finalKills: bw.four_four_ultimate_final_kills_bedwars,
					finalDeaths: bw.four_four_ultimate_final_deaths_bedwars,
					bedsBroken: bw.four_four_ultimate_beds_broken_bedwars,
					bedsLost: bw.four_four_ultimate_beds_lost_bedwars,
					ratios: {
						WLR: Math.round((bw.four_four_ultimate_wins_bedwars / bw.four_four_ultimate_losses_bedwars) * 100) / 100 || 0,
						KDR: Math.round((bw.four_four_ultimate_kills_bedwars / bw.four_four_ultimate_deaths_bedwars) * 100) / 100 || 0,
						FKDR: Math.round((bw.four_four_ultimate_final_kills_bedwars / bw.four_four_ultimate_final_deaths_bedwars) * 100) / 100 || 0,
						BBLR: Math.round((bw.four_four_ultimate_beds_broken_bedwars / bw.four_four_ultimate_beds_lost_bedwars) * 100) / 100 || 0
					},
					averages: {
						finalsPerGame: Math.round((bw.four_four_ultimate_games_played_bedwars / bw.four_four_ultimate_final_kills_bedwars) * 100) / 100 || 0,
						killsPerGame: Math.round((bw.four_four_ultimate_games_played_bedwars / bw.four_four_ultimate_kills_bedwars) * 100) / 100 || 0,
					},
				} : null,
			} : null,
			voidless: bw.eight_two_voidless_games_played_bedwars + bw.four_four_voidless_games_played_bedwars > 0 ? {
				eight_two: bw.eight_two_voidless_games_played_bedwars > 0 ? {
					gamesPlayed: bw.eight_two_voidless_games_played_bedwars,
					winstreak: bw.eight_two_voidless_winstreak,
					wins: bw.eight_two_voidless_wins_bedwars,
					losses: bw.eight_two_voidless_losses_bedwars,
					kills: bw.eight_two_voidless_kills_bedwars,
					deaths: bw.eight_two_voidless_deaths_bedwars,
					finalKills: bw.eight_two_voidless_final_kills_bedwars,
					finalDeaths: bw.eight_two_voidless_final_deaths_bedwars,
					bedsBroken: bw.eight_two_voidless_beds_broken_bedwars,
					bedsLost: bw.eight_two_voidless_beds_lost_bedwars,
					ratios: {
						WLR: Math.round((bw.eight_two_voidless_wins_bedwars / bw.losses_bedwars) * 100) / 100 || 0,
						KDR: Math.round((bw.eight_two_voidless_kills_bedwars / bw.eight_two_voidless_deaths_bedwars) * 100) / 100 || 0,
						FKDR: Math.round((bw.eight_two_voidless_final_kills_bedwars / bw.eight_two_voidless_final_deaths_bedwars) * 100) / 100 || 0,
						BBLR: Math.round((bw.eight_two_voidless_beds_broken_bedwars / bw.eight_two_voidless_beds_lost_bedwars) * 100) / 100 || 0
					},
					averages: {
						finalsPerGame: Math.round((bw.eight_two_voidless_games_played_bedwars / bw.eight_two_voidless_final_kills_bedwars) * 100) / 100 || 0,
						killsPerGame: Math.round((bw.eight_two_voidless_games_played_bedwars / bw.eight_two_voidless_kills_bedwars) * 100) / 100 || 0,
					},
				} : null,
				four_four: bw.four_four_voidless_games_played_bedwars > 0 ? {
					gamesPlayed: bw.four_four_voidless_games_played_bedwars,
					winstreak: bw.four_four_voidless_winstreak,
					wins: bw.four_four_voidless_wins_bedwars,
					losses: bw.four_four_voidless_losses_bedwars,
					kills: bw.four_four_voidless_kills_bedwars,
					deaths: bw.four_four_voidless_deaths_bedwars,
					finalKills: bw.four_four_voidless_final_kills_bedwars,
					finalDeaths: bw.four_four_voidless_final_deaths_bedwars,
					bedsBroken: bw.four_four_voidless_beds_broken_bedwars,
					bedsLost: bw.four_four_voidless_beds_lost_bedwars,
					ratios: {
						WLR: Math.round((bw.four_four_voidless_wins_bedwars / bw.four_four_voidless_losses_bedwars) * 100) / 100 || 0,
						KDR: Math.round((bw.four_four_voidless_kills_bedwars / bw.four_four_voidless_deaths_bedwars) * 100) / 100 || 0,
						FKDR: Math.round((bw.four_four_voidless_final_kills_bedwars / bw.four_four_voidless_final_deaths_bedwars) * 100) / 100 || 0,
						BBLR: Math.round((bw.four_four_voidless_beds_broken_bedwars / bw.four_four_voidless_beds_lost_bedwars) * 100) / 100 || 0
					},
					averages: {
						finalsPerGame: Math.round((bw.four_four_voidless_games_played_bedwars / bw.four_four_voidless_final_kills_bedwars) * 100) / 100 || 0 || 0,
						killsPerGame: Math.round((bw.four_four_voidless_games_played_bedwars / bw.four_four_voidless_kills_bedwars) * 100) / 100 || 0 || 0,
					},
				} : null,
			} : null
		},
		test: {}
	}
	return utils.removeEmpty(reformattedBedwars)
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

function returnSuffix(level) {
	if (level <= 1099) return "✫";
	if (level >= 1100 && level <= 2099) return "✪";
	return "⚝";
}