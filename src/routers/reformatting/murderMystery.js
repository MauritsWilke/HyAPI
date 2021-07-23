const utils = require(`../../utils/utils`)
module.exports = murdermystery

function murdermystery(player) {
	if (!player?.stats?.MurderMystery) return new Error("This player has not played Murder Mystery")
	const mm = player.stats.MurderMystery

	const reformattedMurderMystery = {
		coins: mm.coins,
		coinsPickedUp: mm.coins_pickedup,

		// Chests Opened
		chests: {
			total: mm.MurderMystery_openedChests,

			opened: {
				common: mm.MurderMystery_openedCommons,
				epic: mm.MurderMystery_openedEpics,
				rare: mm.MurderMystery_openedRares,
				legendary: mm.MurderMystery_openedLegendaries,
			},
		},

		// Murder Mystery Cosmetics
		cosmetics: {
			animatedHat: mm.active_animated_hat,
			deathCry: mm.active_deathcry,
			gesture: mm.active_gesture,
			killNote: mm.active_kill_note,
			knifeSkin: mm.active_knife_skin,
			lastWords: mm.active_last_words,
			projectileTrail: mm.active_projectile_trail,
			victoryDance: mm.active_victory_dance,
		},

		// Murder Mystery Assassins
		assasins: {
			games: mm.games_MURDER_ASSASSINS,
			wins: mm.wins_MURDER_ASSASSINS,

			kills: mm.kills_MURDER_ASSASSINS,
			deaths: mm.deaths_MURDER_ASSASSINS,

			coinsPickedUp: mm.coins_pickedup_MURDER_ASSASSINS,
		},

		// Muder Mystery Classic
		classic: {
			coinsPickedUp: mm.coins_pickedup_MURDER_CLASSIC,

			detective: {
				wins: mm.detective_wins_MURDER_CLASSIC,
			},

			murderer: {
				kills: mm.kills_as_murderer_MURDER_CLASSIC,
				wins: mm.murderer_wins_MURDER_CLASSIC,
			},

			overall: {
				deaths: mm.deaths_MURDER_CLASSIC,
				gamesPlayed: mm.games_MURDER_CLASSIC,
				kills: mm.kills_MURDER_CLASSIC,
				suicides: mm.suicides_MURDER_CLASSIC,
				wasHero: mm.was_hero_aquarium_MURDER_CLASSIC,
				wins: mm.wins_MURDER_CLASSIC,
			},
		},

		// Murder Mystery Doulbe Up!
		doubleUp: {

			coinsPickedUp: mm.coins_pickedup_MURDER_DOUBLE_UP,

			detective: {
				wins: mm.detective_wins_MURDER_DOUBLE_UP,
			},

			murderer: {
				kills: mm.kills_as_murderer_MURDER_DOUBLE_UP,
				wins: mm.murderer_wins_MURDER_DOUBLE_UP,
			},

			overall: {
				deaths: mm.deaths_mountain_MURDER_DOUBLE_UP,
				games: mm.games_MURDER_DOUBLE_UP,
				kills: mm.kills_MURDER_DOUBLE_UP,
				suicides: mm.suicides_MURDER_DOUBLE_UP,
				wasHero: mm.was_hero_MURDER_DOUBLE_UP,
				wins: mm.wins_MURDER_DOUBLE_UP,
			},
		},

		// Murder Mystery Hardcore
		hardcore: { // no longer exists
			coinsPickedUp: mm.coins_pickedup_MURDER_HARDCORE,

			overall: {
				deaths: mm.deaths_MURDER_HARDCORE,
				games: mm.games_MURDER_HARDCORE,
				kills: mm.kills_MURDER_HARDCORE,
				wins: mm.wins_MURDER_HARDCORE,
			},
		},

		// Murder Mystery Infection
		infection: { // no longer exists

			coinsPickedUp: mm.coins_pickedup_MURDER_INFECTION,

			overall: {
				deaths: mm.games_MURDER_INFECTION,
				games: mm.games_MURDER_INFECTION,
				kills: mm.games_MURDER_INFECTION,
				timeSurvived: mm.total_time_survived_seconds_library_MURDER_INFECTION,
				wins: mm.games_MURDER_INFECTION,
			},

			survivor: {
				games: mm.games_MURDER_INFECTION,
				kills: mm.kills_as_survivor_MURDER_INFECTION,
				longestTime: mm.longest_time_as_survivor_seconds,
				wins: mm.survivor_wins_MURDER_INFECTION,
			},

		},

		// Overall Stats
		overall: {
			deaths: mm.deaths,
			gamesPlayed: mm.games,
			kills: mm.kills,
			suicides: mm.suicides,
			wasHero: mm.was_hero,
			wins: mm.wins,

			murderer: {
				kills: mm.kills_as_murderer,
				wins: mm.murderer_wins,
			},

			detective: {
				quickestWin: mm.quickest_detective_win_time_seconds,
				wins: mm.detective_wins,
			},
		},
	}

	return utils.removeEmpty(reformattedMurderMystery)
}