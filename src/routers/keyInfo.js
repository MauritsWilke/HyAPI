const { MongoClient } = require('mongodb');
const express = require('express');
const router = express.Router();
const client = new MongoClient(process.env.MONGODB_URI_UUID, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect(err => {
	if (err) {
		console.log(err)
		console.log("failed to connect to database, aborting...");
		process.exit()
	}
	console.log("Connected to database from keyInfo.js")
})

router.use(express.json())

router.get('/', async function (req, res) {
	let keyDB = client.db("keys").collection("keys")
	const queryKey = typeof (req.query.key) == "object" ? req.query.key[0] : req.query.key;
	const key = await keyDB.findOne({ key: queryKey })

	res.status(200).send({
		...key
	})
})

module.exports = router