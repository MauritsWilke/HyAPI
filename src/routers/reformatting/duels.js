const mcColours = require(`../../utils/minecraftColours.json`);
const { removeEmpty } = require(`../../utils/utils`)
module.exports = duels

function duels(player) {
	if (!player?.stats?.Duels) return new Error("This player has not played Duels")
	const duels = player.stats.Duels

	const reformattedDuels = {
		coins: duels?.coins ?? null,
		pingRange: duels?.pingPreference ?? "None",

		cosmetics: {
			total: duels?.packages?.length ?? 0,
			enabled: {
				trail: duels?.active_projectile_trail,
				goal: duels?.active_goal,
				hat: duels?.active_hat,
				cage: duels?.active_cage,
				weapon: duels?.active_weaponpacks,
				killEffect: duels?.active_kill_effect,
				emblem: duels?.active_emblem,
				aura: duels?.active_auras,
				killMessages: duels?.active_killmessages,
				victoryDance: duels?.active_victory_dance,
				title: duels?.active_cosmetictitle,
			}
		},

		lootboxes: {
			total: duels?.duels_chests ?? 0,
			opened: {
				total: duels?.Duels_openedChests ?? 0,
				common: duels?.Duels_openedCommons ?? 0,
				rare: duels?.Duels_openedRares ?? 0,
				epic: duels?.Duels_openedEpics ?? 0,
				legendary: duels?.Duels_openedLegendaries ?? 0,
			},
			history: duels?.duels_chest_history ?? null,
		},

		// * Overall
		overall: duels?.games_played_duels > 0 ? {
			title: {
				type: getTitle(duels?.wins / 2),
				hex: getTitleHex(getTitle(duels?.wins * 2))
			},

			gamesPlayed: duels?.rounds_played,
			duelsPlayed: duels?.games_played_duels - duels?.rounds_played,

			wins: duels?.wins ?? null,
			losses: duels?.losses ?? null,

			kills: duels?.kills ?? null,
			deaths: duels?.deaths ?? null,

			bowShots: duels?.bow_shots,
			bowHits: duels?.bow_hits,
			meleeHits: duels?.melee_hits,
			meleeSwings: duels?.melee_swings,

			blocksPlaced: duels?.blocks_placed,

			winstreak: duels?.current_winstreak,
			bestWinstreak: duels?.best_overall_winstreak,

			healthRegenerated: duels?.health_regenerated,
			damageDealt: duels?.damage_dealt,

			ratios: {
				WLR: Math.round((duels?.losses / duels?.wins) * 100) / 100 || 0,
				KDR: Math.round((duels?.deaths / duels?.kills) * 100) / 100 || 0,
				accuracy: {
					melee: Math.round((duels?.meleeHits / duels?.meleeSwings) * 100) / 100 || 0,
					bow: Math.round((duels?.bowHits / duels?.bowShots) * 100) / 100 || 0
				},
			}
		} : null,

		// * Sumo
		sumo: duels?.sumo_duel_rounds_played > 0 ? {
			title: {
				type: getTitle(duels?.sumo_duel_wins),
				hex: getTitleHex(getTitle(duels?.sumo_duel_wins))
			},

			gamesPlayed: duels?.sumo_duel_rounds_played,

			wins: duels?.sumo_duel_wins,
			losses: duels?.sumo_duel_losses,

			hits: duels?.sumo_duel_melee_hits,
			swings: duels?.sumo_duel_melee_swings,

			deaths: duels?.sumo_duel_deaths,
			kills: duels?.sumo_duel_kills,

			winstreak: duels?.current_sumo_winstreak,

			bestWinstreak: duels?.best_sumo_winstreak,

			ratios: {
				WLR: Math.round((duels?.sumo_duel_losses / duels?.sumo_duel_wins) * 100) / 100 || 0,
				KDR: Math.round((duels?.sumo_duel_deaths / duels?.sumo_duel_kills) * 100) / 100 || 0,
				accuracy: Math.round((duels?.sumo_duel_melee_hits / duels?.sumo_duel_melee_swings) * 100) / 100 || 0,
			}
		} : null,

		// * Bow Duels
		bow: duels?.bow_duel_rounds_played > 0 ? {
			title: {
				type: getTitle(duels?.bow_duel_wins),
				hex: getTitleHex(getTitle(duels?.bow_duel_wins))
			},

			gamesPlayed: duels?.bow_duel_rounds_played,

			wins: duels?.bow_duel_wins,
			losses: duels?.bow_duel_losses,

			hits: duels?.bow_duel_bow_hits,
			shots: duels?.bow_duel_bow_shots,

			deaths: duels?.bow_duel_deaths,
			kills: duels?.bow_duel_kills,

			damageDealt: duels?.bow_duel_damage_dealt,
			healthRegenerated: duels?.bow_duel_health_regenerated,

			bestWinstreak: duels?.best_winstreak_mode_bow_duel,
			winstreak: duels?.current_winstreak_mode_bow_duel,

			ratios: {
				WLR: Math.round((duels?.bow_duel_losses / duels?.bow_duel_wins) * 100) / 100 || 0,
				KDR: Math.round((duels?.bow_duel_deaths / duels?.bow_duel_kills) * 100) / 100 || 0,
				accuracy: Math.round((duels?.bow_duel_bow_hits / duels?.bow_duel_bow_shots) * 100) / 100 || 0,
			}
		} : null,

		// * Combo Duels
		combo: duels?.combo_duel_rounds_played > 0 ? {
			title: {
				type: getTitle(duels?.combo_duel_wins),
				hex: getTitleHex(getTitle(duels?.combo_duel_wins))
			},

			gamesPlayed: duels?.combo_duel_rounds_played,

			wins: duels?.combo_duel_wins,
			losses: duels?.combo_duel_losses,

			hits: duels?.combo_duel_melee_hits,
			swings: duels?.combo_duel_melee_swings,

			deaths: duels?.combo_duel_deaths,
			kills: duels?.combo_duel_kills,

			applesEaten: duels?.combo_duel_golden_apples_eaten,

			healthRegenerated: duels?.combo_duel_health_regenerated,

			winstreak: duels?.current_winstreak_mode_combo_duel,
			bestWinstreak: duels?.best_winstreak_mode_combo_duel,

			ratios: {
				WLR: Math.round((duels?.combo_duel_losses / duels?.combo_duel_wins) * 100) / 100 || 0,
				KDR: Math.round((duels?.combo_duel_deaths / duels?.combo_duel_kills) * 100) / 100 || 0,
				accuracy: Math.round((duels?.combo_duel_melee_hits / duels?.combo_duel_melee_swings) * 100) / 100 || 0,
			}
		} : null,

		// * Potion Duels
		noDebuff: duels?.potion_duel_rounds_played > 0 ? {
			title: {
				type: getTitle(duels?.potion_duel_wins),
				hex: getTitleHex(getTitle(duels?.potion_duel_wins))
			},

			gamesPlayed: duels?.potion_duel_rounds_played,

			wins: duels?.potion_duel_wins,
			losses: duels?.potion_duel_losses,

			hits: duels?.potion_duel_melee_hits,
			swings: duels?.potion_duel_melee_swings,

			deaths: duels?.potion_duel_deaths,
			kills: duels?.potion_duel_kills,

			damageDealt: duels?.potion_duel_damage_dealt,
			healthRegenerated: duels?.potion_duel_health_regenerated,

			potsUsed: duels?.potion_duel_heal_pots_used,

			winstreak: duels?.current_winstreak_mode_potion_duel,
			bestWinstreak: duels?.best_winstreak_mode_potion_duel,
			ratios: {
				WLR: Math.round((duels?.potion_duel_losses / duels?.potion_duel_wins) * 100) / 100 || 0,
				KDR: Math.round((duels?.potion_duel_deaths / duels?.potion_duel_kills) * 100) / 100 || 0,
				accuracy: Math.round((duels?.potion_duel_melee_hits / duels?.potion_duel_melee_swings) * 100) / 100 || 0
			}
		} : null,

		// * Bow Spleef
		bowSpleef: duels?.bowspleef_duel_rounds_played > 0 ? {
			title: {
				type: getTitle(duels?.bowspleef_duel_wins),
				hex: getTitleHex(getTitle(duels?.bowspleef_duel_wins))
			},

			gamesPlayed: duels?.bowspleef_duel_rounds_played,

			wins: duels?.bowspleef_duel_wins,
			losses: duels?.bowspleef_duel_losses,

			shots: duels?.bowspleef_duel_bow_shots,
			deaths: duels?.bowspleef_duel_deaths,

			winstreak: duels?.current_winstreak_mode_bowspleef_duel,
			bestWinstreak: duels?.best_winstreak_mode_bowspleef_duel,

			ratios: {
				WLR: Math.round((duels?.bowspleef_duel_losses / duels?.bowspleef_duel_wins) * 100) / 100 || 0,
			}
		} : null,

		// * Classic Mode
		classic: duels?.classic_duel_rounds_played > 0 ? {
			title: {
				type: getTitle(duels?.classic_duel_wins),
				hex: getTitleHex(getTitle(duels?.classic_duel_wins))
			},

			gamesPlayed: duels?.classic_duel_rounds_played,

			wins: duels?.classic_duel_wins,
			losses: duels?.classic_duel_losses,

			kills: duels?.classic_duel_kills,
			deaths: duels?.classic_duel_deaths,

			meleeHits: duels?.classic_duel_melee_hits,
			meleeSwings: duels?.classic_duel_melee_swings,
			bowHits: duels?.classic_duel_bow_hits,
			bowShots: duels?.classic_duel_bow_shots,

			damageDealt: duels?.classic_duel_damage_dealt,
			healthRegenerated: duels?.classic_duel_health_regenerated,

			winstreak: duels?.current_classic_winstreak,
			bestWinstreak: duels?.best_winstreak_mode_classic_duel,

			ratios: {
				WLR: Math.round((duels?.classic_duel_losses / duels?.classic_duel_wins) * 100) / 100 || 0,
				KDR: Math.round((duels?.classic_duel_deaths / duels?.classic_duel_kills) * 100) / 100 || 0,
				accuracy: {
					melee: Math.round((duels?.classic_duel_melee_hits / duels?.classic_duel_melee_swings) * 100) / 100 || 0,
					bow: Math.round((duels?.classic_duel_bow_hits / duels?.classic_duel_bow_shots) * 100) / 100 || 0
				}
			}
		} : null,

		// * Skywars Duels
		skywars: duels?.sw_duel_rounds_played + duels?.sw_doubles_rounds_played > 0 ? {
			title: {
				type: getTitle(duels?.sw_duel_wins + duels?.sw_doubles_wins),
				hex: getTitleHex(getTitle(duels?.sw_duel_wins + duels?.sw_doubles_wins))
			},

			overall: {
				winstreak: duels?.current_skywars_winstreak,
				bestWinstreak: duels?.best_skywars_winstreak,

				wins: duels?.sw_duel_wins + duels?.sw_doubles_wins,
				losses: duels?.sw_duel_losses + duels?.sw_doubles_losses,

				kills: duels?.sw_duel_kills + duels?.sw_doubles_kills,
				deaths: duels?.sw_duel_deaths + duels?.sw_doubles_deaths,

				ratios: {
					WLR: (duels?.sw_duel_losses + duels?.sw_doubles_losses) / (duels?.sw_duel_losses + duels?.sw_doubles_losses),
					KDR: (duels?.sw_duel_deaths + duels?.sw_doubles_deaths) / (duels?.sw_duel_kills + duels?.sw_doubles_kills),
				}
			},

			solo: duels?.sw_duel_rounds_played > 0 ? {
				gamesPlayed: duels?.sw_duel_rounds_played,

				wins: duels?.sw_duel_wins,
				losses: duels?.sw_duel_losses,

				kills: duels?.sw_duel_kills,
				deaths: duels?.sw_duel_deaths,

				meleeSwings: duels?.sw_duel_melee_swings,
				meleeHits: duels?.sw_duel_melee_hits,

				damageDealt: duels?.sw_duel_damage_dealt,
				healthRegenerated: duels?.sw_duel_health_regenerated,

				blocksPlaced: duels?.sw_duel_blocks_placed,

				winstreak: duels?.current_winstreak_mode_sw_duel,
				bestWinstreak: duels?.best_winstreak_mode_sw_duel,

				ratios: {
					WLR: Math.round((duels?.sw_duel_losses / duels?.sw_duel_wins) * 100) / 100 || 0,
					KDR: Math.round((duels?.sw_duel_deaths / duels?.sw_duel_kills) * 100) / 100 || 0,
					accuracy: {
						melee: Math.round((duels?.sw_duel_melee_hits / duels?.sw_duel_melee_swings) * 100) / 100 || 0,
						bow: Math.round((duels?.sw_duel_bow_hits / duels?.sw_duel_bow_shots) * 100) / 100 || 0
					}
				}
			} : null,
			doubles: duels?.sw_doubles_rounds_played > 0 ? {
				gamesPlayed: duels?.sw_doubles_rounds_played,

				wins: duels?.sw_doubles_wins,
				losses: duels?.sw_doubles_losses,

				kills: duels?.sw_doubles_kills,
				deaths: duels?.sw_doubles_deaths,

				bowHits: duels?.sw_doubles_bow_hits,
				bowShots: duels?.sw_doubles_bow_shots,
				meleeSwings: duels?.sw_doubles_melee_swings,
				meleeHits: duels?.sw_doubles_melee_hits,

				damageDealt: duels?.sw_doubles_damage_dealt,
				healthRegenerated: duels?.sw_doubles_health_regenerated,

				blocksPlaced: duels?.sw_doubles_blocks_placed,

				winstreak: duels?.current_winstreak_mode_sw_doubles,
				bestWinstreak: duels?.best_winstreak_mode_sw_doubles,

				ratios: {
					WLR: Math.round((duels?.sw_doubles_losses / duels?.sw_doubles_wins) * 100) / 100 || 0,
					KDR: Math.round((duels?.sw_doubles_deaths / duels?.sw_doubles_kills) * 100) / 100 || 0,
					accuracy: {
						melee: Math.round((duels?.sw_doubles_melee_hits / duels?.sw_doubles_melee_swings) * 100) / 100 || 0,
						bow: Math.round((duels?.sw_doubles_bow_hits / duels?.sw_doubles_bow_shots) * 100) / 100 || 0
					}
				}
			} : null,
		} : null,

		// * OP Duels
		op: duels?.op_duel_rounds_played > 0 ? {
			title: {
				type: getTitle(duels?.op_duel_wins),
				hex: getTitleHex(getTitle(duels?.op_duel_wins))
			},

			gamesPlayed: duels?.op_duel_rounds_played,

			wins: duels?.op_duel_wins,
			losses: duels?.op_duel_losses,

			kills: duels?.op_duel_kills,
			deaths: duels?.op_duel_deaths,

			meleeSwings: duels?.op_duel_melee_swings,
			meleeHits: duels?.op_duel_melee_hits,

			damageDealt: duels?.op_duel_damage_dealt,
			healthRegenerated: duels?.op_duel_health_regenerated,

			winstreak: duels?.current_winstreak_mode_op_duel,
			ratios: {
				WLR: Math.round((duels?.op_duel_losses / duels?.op_duel_wins) * 100) / 100 || 0,
				KDR: Math.round((duels?.sumo_duel_deaths / duels?.sumo_duel_kills) * 100) / 100 || 0,
				accuracy: Math.round((duels?.op_duel_melee_hits / duels?.op_duel_melee_swings) * 100) / 100 || 0,
			}
		} : null,

		// ! Mega Walls
		megaWalls: duels?.mw_doubles_rounds_played + duels?.mw_duel_rounds_played > 0 ? {
			class: duels?.mw_duels_class,
			solo: duels?.mw_duel_rounds_played > 0 ? {
				gamesPlayed: duels?.mw_duel_rounds_played,

				wins: duels?.mw_duel_wins,
				losses: duels?.mw_duel_losses,

				kills: duels?.mw_duel_kills,
				deaths: duels?.mw_duel_deaths,

				meleeHits: duels?.mw_duel_melee_hits,
				meleeSwings: duels?.mw_duel_melee_swings,
				bowHits: duels?.mw_duel_bow_hits,
				bowShots: duels?.mw_duel_bow_shots,

				damageDealt: duels?.mw_duel_damage_dealt,
				healthRegenerated: duels?.mw_duel_health_regenerated,

				blocksPlaced: duels?.mw_duel_blocks_placed,

				bestWinstreak: duels?.best_winstreak_mode_mw_duel,
				currentWinstreak: duels?.current_winstreak_mode_mw_duel,
				bestWinstreak2: duels?.duels_winstreak_best_mw_duel,

				ratios: {
					WLR: Math.round((duels?.mw_duel_losses / duels?.mw_duel_wins) * 100) / 100 || 0,
					KDR: Math.round((duels?.mw_duel_deaths / duels?.mw_duel_kills) * 100) / 100 || 0,
					accuracy: {
						melee: Math.round((duels?.mw_duel_melee_hits / duels?.mw_duel_melee_swings) * 100) / 100 || 0,
						bow: Math.round((duels?.mw_duel_bow_hits / duels?.mw_duel_bow_shots) * 100) / 100 || 0,
					}
				}
			} : null,
			doubles: duels?.mw_doubles_rounds_played > 0 ? {
				gamesPlayed: duels?.mw_doubles_rounds_played,

				kills: duels?.mw_doubles_kills,
				deaths: duels?.mw_doubles_deaths,

				wins: duels?.mw_doubles_wins,
				losses: duels?.mw_doubles_losses,

				meleeHits: duels?.mw_doubles_melee_hits,
				meleeSwings: duels?.mw_doubles_melee_swings,
				bowHits: duels?.mw_doubles_bow_hits,
				bowShots: duels?.mw_doubles_bow_shots,

				damageDealt: duels?.mw_doubles_damage_dealt,
				healthRegenerated: duels?.mw_doubles_health_regenerated,

				blocksPlaced: duels?.mw_doubles_blocks_placed,

				currentWinstreak: duels?.current_winstreak_mode_mw_doubles,

				ratios: {
					WLR: Math.round((duels?.mw_doubles_losses / duels?.mw_doubles_wins) * 100) / 100 || 0,
					KDR: Math.round((duels?.mw_doubles_deaths / duels?.mw_doubles_kills) * 100) / 100 || 0,
					accuracy: {
						melee: Math.round((duels?.mw_doubles_melee_hits / duels?.mw_doubles_melee_swings) * 100) / 100 || 0,
						bow: Math.round((duels?.mw_doubles_bow_hits / duels?.mw_doubles_bow_shots) * 100) / 100 || 0,
					}
				}
			} : null,
		} : null,

		// * BRIDGE
		bridge: {
			title: {
				type: getTitle(player?.achievements?.duels_bridge_wins),
				hex: getTitleHex(getTitle(player?.achievements?.duels_bridge_wins))
			},

			overall: duels?.bridge_duel_rounds_played + duels?.bridge_doubles_rounds_played + duels?.bridge_2v2v2v2_rounds_played + duels?.bridge_3v3v3v3_rounds_played + duels?.bridge_four_rounds_played < 0 ? {

				gamesPlayed:
					duels?.bridge_duel_rounds_played +
					duels?.bridge_doubles_rounds_played +
					duels?.bridge_2v2v2v2_rounds_played +
					duels?.bridge_3v3v3v3_rounds_played +
					duels?.bridge_four_rounds_played
				,
				goals: duels?.goals,

				wins: player?.achievements?.duels_bridge_wins,
				losses:
					duels?.bridge_duel_losses +
					duels?.bridge_doubles_losses +
					duels?.bridge_2v2v2v2_losses +
					duels?.bridge_3v3v3v3_losses +
					duels?.bridge_four_losses
				,

				kills: duels?.bridge_kills,
				deaths: duels?.bridge_deaths,

				winstreak: duels?.current_bridge_winstreak,
				bestWinstreak: duels?.best_bridge_winstreak,

				ratios: {
					KDR: Math.round((duels?.bridge_deaths / duels?.bridge_kills) * 100) / 100 || 0,
					WLR: Math.round(((duels?.bridge_duel_losses +
						duels?.bridge_doubles_losses +
						duels?.bridge_2v2v2v2_losses +
						duels?.bridge_3v3v3v3_losses +
						duels?.bridge_four_losses) /
						player?.achievements?.duels_bridge_wins) * 100) / 100 || 0
				}
			} : null,
			solo: duels?.bridge_duel_rounds_played > 0 ? {
				gamesPlayed: duels?.bridge_duel_rounds_played,
				goals: duels?.bridge_duel_goals,

				wins: duels?.bridge_duel_wins,
				losses: duels?.bridge_duel_losses,

				kills: duels?.bridge_duel_bridge_kills,
				deaths: duels?.bridge_duel_bridge_deaths,

				damageDealt: duels?.bridge_duel_damage_dealt,
				healthRegenerated: duels?.bridge_duel_health_regenerated,

				meleeHits: duels?.bridge_duel_melee_hits,
				meleeSwings: duels?.bridge_duel_melee_swings,
				bowHits: duels?.bridge_duel_bow_hits,
				bowShots: duels?.bridge_duel_bow_shots,

				blocksPlaced: duels?.bridge_duel_blocks_placed,

				winstreak: duels?.current_winstreak_mode_bridge_duel,
				bestWinstreak: duels?.best_winstreak_mode_bridge_duel,

				ratios: {
					WLR: Math.round((duels?.bridge_duel_losses / duels?.bridge_duel_wins) * 100) / 100 || 0,
					KDR: Math.round((duels?.bridge_duel_bridge_deaths / duels?.bridge_duel_bridge_kills) * 100) / 100 || 0,
					accuracy: {
						melee: Math.round((duels?.bridge_duel_melee_hits / duels?.bridge_duel_melee_swings) * 100) / 100 || 0,
						bow: Math.round((duels?.bridge_duel_bow_hits / duels?.bridge_duel_bow_shots) * 100) / 100 || 0,
					}
				}
			} : null,
			doubles: duels?.bridge_doubles_rounds_played > 0 ? {
				gamesPlayed: duels?.bridge_doubles_rounds_played,
				goals: duels?.bridge_doubles_goals,

				wins: duels?.bridge_doubles_wins,
				losses: duels?.bridge_doubles_losses,

				kills: duels?.bridge_doubles_bridge_kills,
				deaths: duels?.bridge_doubles_bridge_deaths,

				damageDealt: duels?.bridge_doubles_damage_dealt,
				healthRegenerated: duels?.bridge_doubles_health_regenerated,

				bowHits: duels?.bridge_doubles_bow_hits,
				bowShots: duels?.bridge_doubles_bow_shots,
				meleeHits: duels?.bridge_doubles_melee_hits,
				meleeSwings: duels?.bridge_doubles_melee_swings,

				blocksPlaced: duels?.bridge_doubles_blocks_placed,

				winstreak: duels?.current_winstreak_mode_bridge_doubles,
				bestWinstreak: duels?.best_winstreak_mode_bridge_doubles,

				ratios: {
					WLR: Math.round((duels?.bridge_doubles_losses / duels?.bridge_doubles_wins) * 100) / 100 || 0,
					KDR: Math.round((duels?.bridge_doubles_bridge_deaths / duels?.bridge_doubles_bridge_kills) * 100) / 100 || 0,
					accuracy: {
						melee: Math.round((duels?.bridge_doubles_melee_hits / duels?.bridge_doubles_melee_swings) * 100) / 100 || 0,
						bow: Math.round((duels?.bridge_doubles_bow_hits / duels?.bridge_doubles_bow_shots) * 100) / 100 || 0,
					}
				}
			} : null,
			two_four: duels?.bridge_2v2v2v2_rounds_played > 0 ? {
				gamesPlayed: duels?.bridge_2v2v2v2_rounds_played,
				goals: duels?.bridge_2v2v2v2_goals,

				wins: duels?.bridge_2v2v2v2_wins,
				losses: duels?.bridge_2v2v2v2_losses,

				kills: duels?.bridge_2v2v2v2_bridge_kills,
				deaths: duels?.bridge_2v2v2v2_bridge_deaths,

				damageDealt: duels?.bridge_2v2v2v2_damage_dealt,
				healthRegenerated: duels?.bridge_2v2v2v2_health_regenerated,

				bowHits: duels?.bridge_2v2v2v2_bow_hits,
				bowShots: duels?.bridge_2v2v2v2_bow_shots,
				meleeHits: duels?.bridge_2v2v2v2_melee_hits,
				meleeSwings: duels?.bridge_2v2v2v2_melee_swings,

				blocksPlaced: duels?.bridge_2v2v2v2_blocks_placed,

				winstreak: duels?.current_winstreak_mode_bridge_2v2v2v2,
				bestWinstreak: duels?.best_winstreak_mode_bridge_2v2v2v2,

				ratios: {
					WLR: Math.round((duels?.bridge_2v2v2v2_losses / duels?.bridge_2v2v2v2_wins) * 100) / 100 || 0,
					KDR: Math.round((duels?.bridge_2v2v2v2_bridge_deaths / duels?.bridge_2v2v2v2_bridge_kills) * 100) / 100 || 0,
					accuracy: {
						melee: Math.round((duels?.bridge_2v2v2v2_melee_hits / duels?.bridge_2v2v2v2_melee_swings) * 100) / 100 || 0,
						bow: Math.round((duels?.bridge_2v2v2v2_bow_hits / duels?.bridge_2v2v2v2_bow_shots) * 100) / 100 || 0,
					}
				}
			} : null,
			three_four: duels?.bridge_3v3v3v3_rounds_played > 0 ? {
				gamesPlayed: duels?.bridge_3v3v3v3_rounds_played,
				goals: duels?.bridge_3v3v3v3_goals,

				wins: duels?.bridge_3v3v3v3_wins,
				losses: duels?.bridge_3v3v3v3_losses,

				kills: duels?.bridge_3v3v3v3_bridge_kills,
				deaths: duels?.bridge_3v3v3v3_bridge_deaths,

				blocksPlaced: duels?.bridge_3v3v3v3_blocks_placed,

				damageDealt: duels?.bridge_3v3v3v3_damage_dealt,
				healthRegenerated: duels?.bridge_3v3v3v3_health_regenerated,

				meleeHits: duels?.bridge_3v3v3v3_melee_hits,
				meleeSwings: duels?.bridge_3v3v3v3_melee_swings,
				bowHits: duels?.bridge_3v3v3v3_bow_hits,
				bowShots: duels?.bridge_3v3v3v3_bow_shots,

				winstreak: duels?.current_winstreak_mode_bridge_3v3v3v3,

				ratios: {
					WLR: Math.round((duels?.bridge_3v3v3v3_losses / duels?.bridge_3v3v3v3_wins) * 100) / 100 || 0,
					KDR: Math.round((duels?.bridge_3v3v3v3_bridge_deaths / duels?.bridge_3v3v3v3_bridge_kills) * 100) / 100 || 0,
					accuracy: {
						melee: Math.round((duels?.bridge_3v3v3v3_melee_hits / duels?.bridge_3v3v3v3_melee_swings) * 100) / 100 || 0,
						bow: Math.round((duels?.bridge_3v3v3v3_bow_hits / duels?.bridge_3v3v3v3_bow_shots) * 100) / 100 || 0,
					}
				}
			} : null,
			teams: duels?.bridge_four_rounds_played > 0 ? {
				gamesPlayed: duels?.bridge_four_rounds_played,
				goals: duels?.bridge_four_goals,

				wins: duels?.bridge_four_wins,
				losses: duels?.bridge_four_losses,

				kills: duels?.bridge_four_bridge_kills,
				deaths: duels?.bridge_four_bridge_deaths,

				blocksPlaced: duels?.bridge_four_blocks_placed,

				healthRegenerated: duels?.bridge_four_health_regenerated,
				damageDealt: duels?.bridge_four_damage_dealt,

				meleeHits: duels?.bridge_four_melee_hits,
				meleeSwings: duels?.bridge_four_melee_swings,
				bowShots: duels?.bridge_four_bow_shots,
				bowHits: duels?.bridge_four_bow_hits,

				winstreak: duels?.current_winstreak_mode_bridge_four,
				bestWinstreak: duels?.best_winstreak_mode_bridge_four,

				ratios: {
					WLR: Math.round((duels?.bridge_four_losses / duels?.bridge_four_wins) * 100) / 100 || 0,
					KDR: Math.round((duels?.bridge_four_bridge_deaths / duels?.bridge_four_bridge_kills) * 100) / 100 || 0,
					accuracy: {
						melee: Math.round((duels?.bridge_four_melee_hits / duels?.bridge_four_melee_swings) * 100) / 100 || 0,
						bow: Math.round((duels?.bridge_four_bow_hits / duels?.bridge_four_bow_shots) * 100) / 100 || 0,
					}
				}
			} : null,
		},

		// * Blitz
		blitz: duels?.blitz_duel_rounds_played > 0 ? {
			title: {
				type: getTitle(duels?.blitz_duel_wins),
				hex: getTitleHex(getTitle(duels?.blitz_duel_wins))
			},

			gamesPlayed: duels?.blitz_duel_rounds_played,
			kit: duels?.blitz_duels_kit,

			losses: duels?.blitz_duel_losses,
			wins: duels?.blitz_duel_wins,

			kills: duels?.blitz_duel_kills,
			deaths: duels?.blitz_duel_deaths,

			swings: duels?.blitz_duel_melee_swings,
			hits: duels?.blitz_duel_melee_hits,

			damageDealt: duels?.blitz_duel_damage_dealt,
			healthRegenerated: duels?.blitz_duel_health_regenerated,

			winstreak: duels?.current_blitz_winstreak,
			winstreak: duels?.current_winstreak_mode_blitz_duel,

			ratios: {
				WLR: Math.round((duels?.blitz_duel_losses / duels?.blitz_duel_lossesduels) * 100) / 100 || 0,
				KDR: Math.round((duels?.blitz_duel_deaths / duels?.blitz_duel_kills) * 100) / 100 || 0,
				accuracy: Math.round((duels?.blitz_duel_melee_hits / duels?.blitz_duel_melee_swings) * 100) / 100 || 0,
			}
		} : null,

		// ! UHC
		uhc: duels?.uhc_duel_rounds_played + duels?.uhc_doubles_rounds_played + duels?.uhc_four_rounds_played + duels?.uhc_meetup_rounds_played > 0 ? {

			winstreak: duels?.current_duels?.uhc_winstreak,
			bestWinstreak: duels?.best_duels?.uhc_winstreak,

			solo: duels?.uhc_duel_rounds_played > 0 ? {
				gamesPlayed: duels?.uhc_duel_rounds_played,

				wins: duels?.uhc_duel_wins,
				losses: duels?.uhc_duel_losses,

				kills: duels?.uhc_duel_kills,
				deaths: duels?.uhc_duel_deaths,

				healthRegenerated: duels?.uhc_duel_health_regenerated,
				damageDealt: duels?.uhc_duel_damage_dealt,

				blocksPlaced: duels?.uhc_duel_blocks_placed,

				meleeHits: duels?.uhc_duel_melee_hits,
				meleeSwings: duels?.uhc_duel_melee_swings,
				bowHits: duels?.uhc_duel_bow_hits,
				bowShots: duels?.uhc_duel_bow_shots,

				winstreak: duels?.current_winstreak_mode_duels?.uhc_duel,
				bestWinstreak: duels?.best_winstreak_mode_duels?.uhc_duel,
				bestWinstreak2: duels?.duels_winstreak_best_duels?.uhc_duel,

				ratios: {
					WLR: Math.round((duels?.uhc_duel_losses / duels?.uhc_duel_wins) * 100) / 100 || 0,
					KDR: Math.round((duels?.uhc_duel_deaths / duels?.uhc_duel_kills) * 100) / 100 || 0,
					accuracy: {
						melee: Math.round((duels?.uhc_duel_melee_hits / duels?.uhc_duel_melee_swings) * 100) / 100 || 0,
						bow: Math.round((duels?.uhc_duel_bow_hits / duels?.uhc_duel_bow_shots) * 100) / 100 || 0,
					}
				}
			} : null,

			doubles: duels?.uhc_doubles_rounds_played > 0 ? {
				gamesPlayed: duels?.uhc_doubles_rounds_played,

				wins: duels?.uhc_doubles_wins,
				losses: duels?.uhc_doubles_losses,

				kills: duels?.uhc_doubles_kills,
				deaths: duels?.uhc_doubles_deaths,

				meleeHits: duels?.uhc_doubles_melee_hits,
				meleeSwings: duels?.uhc_doubles_melee_swings,
				bowHits: duels?.uhc_doubles_bow_hits,
				bowShots: duels?.uhc_doubles_bow_shots,

				damageDealt: duels?.uhc_doubles_damage_dealt,
				healthRegenerated: duels?.uhc_doubles_health_regenerated,

				blocksPlaced: duels?.uhc_doubles_blocks_placed,

				winstreak: duels?.current_winstreak_mode_duels?.uhc_doubles,
				bestWinstreak: duels?.best_winstreak_mode_duels?.uhc_doubles,
				bestWinstreak2: duels?.duels_winstreak_best_duels?.uhc_doubles,

				ratios: {
					WLR: Math.round((duels?.uhc_doubles_losses / duels?.uhc_doubles_wins) * 100) / 100 || 0,
					KDR: Math.round((duels?.uhc_doubles_deaths / duels?.uhc_doubles_kills) * 100) / 100 || 0,
					accuracy: {
						melee: Math.round((duels?.uhc_doubles_melee_hits / duels?.uhc_doubles_melee_swings) * 100) / 100 || 0,
						bow: Math.round((duels?.uhc_doubles_bow_hits / duels?.uhc_doubles_bow_shots) * 100) / 100 || 0
					}
				}
			} : null,

			teams: duels?.uhc_four_rounds_played > 0 ? {
				gamesPlayed: duels?.uhc_four_rounds_played,

				wins: duels?.uhc_four_wins,
				losses: duels?.uhc_four_losses,

				kills: duels?.uhc_four_kills,
				deaths: duels?.uhc_four_deaths,

				bowHits: duels?.uhc_four_bow_hits,
				bowShots: duels?.uhc_four_bow_shots,
				meleeHits: duels?.uhc_four_melee_hits,
				meleeSwings: duels?.uhc_four_melee_swings,

				damageDealt: duels?.uhc_four_damage_dealt,
				healthRegenerated: duels?.uhc_four_health_regenerated,

				blocksPlaced: duels?.uhc_four_blocks_placed,

				winstreak: duels?.current_winstreak_mode_duels?.uhc_four,
				bestwinstreak: duels?.best_winstreak_mode_duels?.uhc_four,
				bestWinstreak: duels?.duels_winstreak_best_duels?.uhc_four,


				ratios: {
					WLR: Math.round((duels?.uhc_four_losses / duels?.uhc_four_wins) * 100) / 100 || 0,
					KDR: Math.round((duels?.uhc_four_deaths / duels?.uhc_four_kills) * 100) / 100 || 0,
					accuracy: {
						melee: Math.round((duels?.uhc_four_melee_hits / duels?.uhc_four_melee_swings) * 100) / 100 || 0,
						bow: Math.round((duels?.uhc_four_bow_hits / duels?.uhc_four_bow_shots) * 100) / 100 || 0
					}
				}
			} : null,

			meetup: duels?.uhc_meetup_rounds_played > 0 ? {
				gamesPlayed: duels?.uhc_meetup_rounds_played,

				wins: duels?.uhc_meetup_wins,
				losses: duels?.uhc_meetup_losses,

				kills: duels?.uhc_meetup_kills,
				deaths: duels?.uhc_meetup_deaths,

				meleeHits: duels?.uhc_meetup_melee_hits,
				meleeSwings: duels?.uhc_meetup_melee_swings,
				bowHits: duels?.uhc_meetup_bow_hits,
				bowShots: duels?.uhc_meetup_bow_shots,

				blocksPlaced: duels?.uhc_meetup_blocks_placed,

				healthRegenerated: duels?.uhc_meetup_health_regenerated,
				damageDealt: duels?.uhc_meetup_damage_dealt,

				winstreak: duels?.current_winstreak_mode_duels?.uhc_meetup,


				ratios: {
					WLR: Math.round((duels?.uhc_meetup_losses / duels?.uhc_meetup_wins) * 100) / 100 || 0,
					KDR: Math.round((duels?.uhc_meetup_deaths / duels?.uhc_meetup_kills) * 100) / 100 || 0,
					accuracy: {
						melee: Math.round((duels?.uhc_meetup_melee_hits / duels?.uhc_meetup_melee_swings) * 100) / 100 || 0,
						bow: Math.round((duels?.uhc_meetup_bow_hits / duels?.uhc_meetup_bow_shots) * 100) / 100 || 0
					}
				}
			} : null
		} : null,
	}
	return removeEmpty(reformattedDuels)
}

function getTitle(wins) {
	if (!wins) return "None"
	if (wins < 50) return "None"
	if (wins < 60) return "Rookie 1"
	if (wins < 70) return "Rookie 2"
	if (wins < 80) return "Rookie 3"
	if (wins < 90) return "Rookie 4"
	if (wins < 100) return "Rookie 5"
	if (wins < 130) return "Iron 1"
	if (wins < 160) return "Iron 2"
	if (wins < 190) return "Iron 3"
	if (wins < 220) return "Iron 4"
	if (wins < 250) return "Iron 5"
	if (wins < 300) return "Gold 1"
	if (wins < 350) return "Gold 2"
	if (wins < 400) return "Gold 3"
	if (wins < 450) return "Gold 4"
	if (wins < 500) return "Gold 5"
	if (wins < 600) return "Diamond 1"
	if (wins < 700) return "Diamond 2"
	if (wins < 800) return "Diamond 3"
	if (wins < 900) return "Diamond 4"
	if (wins < 1000) return "Diamond 5"
	if (wins < 1200) return "Master 1"
	if (wins < 1400) return "Master 2"
	if (wins < 1600) return "Master 3"
	if (wins < 1800) return "Master 4"
	if (wins < 2000) return "Master 5"
	if (wins < 2600) return "Legend 1"
	if (wins < 3200) return "Legend 2"
	if (wins < 3800) return "Legend 3"
	if (wins < 4400) return "Legend 4"
	if (wins < 5000) return "Legend 5"
	if (wins < 6000) return "Grandmaster 1"
	if (wins < 7000) return "Grandmaster 2"
	if (wins < 8000) return "Grandmaster 3"
	if (wins < 9000) return "Grandmaster 4"
	if (wins < 10000) return "Grandmaster 5"
	if (wins < 12000) return "Godlike 1"
	if (wins < 14000) return "Godlike 2"
	if (wins < 16000) return "Godlike 3"
	if (wins < 18000) return "Godlike 4"
	if (wins < 20000) return "Godlike 5"
	if (wins < 22000) return "Godlike 6"
	if (wins < 24000) return "Godlike 7"
	if (wins < 26000) return "Godlike 8"
	if (wins < 28000) return "Godlike 9"
	return "Godlike 10"
}

function getTitleHex(title) {
	if (!title) return
	if (title.toLowerCase().includes("rookie")) return mcColours.dark_gray
	if (title.toLowerCase().includes("iron")) return mcColours.gray
	if (title.toLowerCase().includes("gold")) return mcColours.gold
	if (title.toLowerCase().includes("diamond")) return mcColours.aqua
	if (title.toLowerCase().includes("master")) return mcColours.dark_green
	if (title.toLowerCase().includes("legend")) return mcColours.dark_red
	if (title.toLowerCase().includes("grandmaster")) return mcColours.yellow
	if (title.toLowerCase().includes("godlike")) return mcColours.dark_purple
}