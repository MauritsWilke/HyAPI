const mcColours = require(`../../utils/minecraftColours.json`)
const utils = require(`../../utils/utils`)
module.exports = buildbattle

function buildbattle(player) {
	if (!player?.stats?.BuildBattle) return new Error("This player has not played Build Battle")
	const reformattedBuildBattle = {
		coins: player.stats.BuildBattle?.coins ?? 0,
		score: player.stats.BuildBattle?.score ?? 0,
		superVotes: player.stats.BuildBattle?.super_votes ?? 0,

		title: {
			type: getTitle(player.stats.BuildBattle.score),
			hex: getHex(player.stats.BuildBattle.score),
		},

		cosmetics: {
			backdrop: player.stats.BuildBattle?.selected_backdrop ?? null,
			hat: player.stats.BuildBattle?.new_selected_hat ?? null,
			suit: player.stats.BuildBattle?.new_suit ?? null,
			trail: player.stats.BuildBattle?.active_movement_trail ?? null,
			victoryDance: player.stats.BuildBattle?.new_victory_dance ?? null,
		},

		overall: {
			gamesPlayed: player.stats.BuildBattle?.games_played ?? 0,
			votes: player.stats.BuildBattle?.total_votes ?? 0,
			wins: player.stats.BuildBattle?.wins ?? 0,
		},

		pro: {
			wins: player.stats.BuildBattle?.wins_solo_pro ?? 0,
		},

		solo: {
			wins: player.stats.BuildBattle?.wins_solo_normal ?? 0,
		},

		teams: {
			wins: player.stats.BuildBattle?.wins_teams_normal ?? 0,
		},

		guessTheBuild: {
			correct: player.stats.BuildBattle?.correct_guesses ?? 0,
			wins: player.stats.BuildBattle?.wins_guess_the_build ?? 0,
		},
	}
	return utils.removeEmpty(reformattedBuildBattle)
}

function getTitle(exp) {
	if (exp < 100) return "Rookie"
	if (exp < 250) return "Untrained"
	if (exp < 500) return "Amateur"
	if (exp < 1000) return "Apprentice"
	if (exp < 2000) return "Experienced"
	if (exp < 3500) return "Seasoned"
	if (exp < 5000) return "Trained"
	if (exp < 7500) return "Skilled"
	if (exp < 10000) return "Talented"
	if (exp < 15000) return "Professional"
	if (exp < 20000) return "Expert"
	return "Master"
}

function getHex(exp) {
	if (exp < 100) return mcColours.white
	if (exp < 250) return mcColours.gray
	if (exp < 500) return mcColours.yellow
	if (exp < 1000) return mcColours.green
	if (exp < 2000) return mcColours.light_purple
	if (exp < 3500) return mcColours.blue
	if (exp < 5000) return mcColours.dark_green
	if (exp < 7500) return mcColours.dark_aqua
	if (exp < 10000) return mcColours.red
	if (exp < 15000) return mcColours.dark_purple
	if (exp < 20000) return mcColours.dark_blue
	return mcColours.dark_red
}