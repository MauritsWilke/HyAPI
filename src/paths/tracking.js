var express = require('express')
var router = express.Router()

router.use(express.json())

router.get('/', async function (req, res) {
	try {
		if (!req.query.uuid) throw new Error(`Missing field(s): UUID`)
		const userQuery = typeof (req.query.uuid) == "object" ? req.query.uuid[0].toLowerCase() : req.query.uuid.toLowerCase();
		const userData = await db.find({ "uuid": userQuery }).toArray()
		res.status(200).send({
			success: true,
			user: {
				uuid: userData[0].uuid,
				tracking: userData[0].tracking
			}
		})
	} catch (err) {
		res.status(404).json({
			success: false,
			error: err.message
		})
	}
})

router.post('/', async function (req, res) {
	const { uuid } = req.body;
	console.log(uuid)
	res.status(200).send({
		"success": true,
		"message": `Started tracking ${uuid}`
	})
})

module.exports = router