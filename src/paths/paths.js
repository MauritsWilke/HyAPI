const express = require('express')
const router = express.Router()

router.use(express.json())

const paths = {
	player: {
		params: "uuid or name"
	},
	tracking: {
		params: "uuid or name"
	},
	paths: {}
}

router.get('/', async function (req, res) {
	res.status(200).send({
		paths: paths
	})
})

module.exports = router