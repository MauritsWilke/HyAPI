const { v4 } = require(`uuid`)
const express = require('express');
const router = express.Router();

router.use(express.json())

router.get('/', async function (req, res) {
	try {
		const key = v4()
		res.status(200).send({
			key: key
		})
	} catch (err) {
		res.status(404).json({
			error: err.message
		})
	}
})

module.exports = router
