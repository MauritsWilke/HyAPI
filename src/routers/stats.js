const express = require('express');
const router = express.Router();
const gamemodes = require(`./reformatting/export`)
const mc = require(`../utils/mojang`)
const fetch = require(`node-fetch`)
const config = require(`../config.json`)

router.use(express.json())

router.get('/:gamemode?', async function (req, res) {
	try {
		if (!req.params?.gamemode) throw new Error("Missing path: [gamemode]")

		if (!req.query.uuid && !req.query.name) throw new Error(`Missing field(s): [uuid] or [name]`);
		if (req.query.name && !req.query.uuid) {
			const username = typeof (req.query.name) == "object" ? req.query.name[0].toLowerCase() : req.query.name.toLowerCase();
			userQuery = await mc.getUUID(username).catch(err => { throw new Error(err) })
		} else userQuery = typeof (req.query.uuid) == "object" ? req.query.uuid[0].toLowerCase() : req.query.uuid.toLowerCase();

		const response = await fetch(`${config.BASE_URL}/player?uuid=${userQuery}&key=${process.env.HYPIXEL_API_KEY}`);
		if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
		const json = await response.json()
		const player = json.player
		if (player == null) {
			throw new Error("This user has not logged on to Hypixel")
		}

		res.status(200).send(
			gamemodes[req.params.gamemode.toLowerCase()]?.(player) ?? "invalid gamemode"
		)
	} catch (err) {
		res.status(404).json({
			error: err.message
		})
	}
})

module.exports = router