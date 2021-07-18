const { MongoClient } = require('mongodb');
const client = new MongoClient(process.env.MONGODB_URI_UUID, { useNewUrlParser: true, useUnifiedTopology: true });

let lastMin = new Date().getMinutes()

client.connect(err => {
	if (err) {
		console.log(err)
		console.log("failed to connect to database, aborting...");
		process.exit()
	}
	console.log("Connected to database from auth.js")
})

module.exports = async (req, res, next) => {
	let keyDB = client.db("keys").collection("keys")
	try {
		if (!req.query.key) throw new Error(`Missing field(s): [key] 404`)
		const queryKey = typeof (req.query.key) == "object" ? req.query.key[0] : req.query.key;
		const key = await keyDB.findOne({ key: queryKey })
		if (key == null) throw new Error(`Invalid key`)
		if (new Date().getMinutes() != lastMin) {
			lastMin = new Date().getMinutes()
			keyDB.updateOne({ key: key.key }, { $set: { queriesLastMin: 0 } })
		}
		if (key.queriesLastMin >= key.limit) throw new Error(`Reached query limit per minute [${key.limit}] 429`)

		keyDB.updateOne({ key: key.key }, { $set: { queriesLastMin: +key.queriesLastMin + 1 } })

		next()
	} catch (e) {
		res.status(e.message.slice(e.message.length - 3, e.message.length)).json({
			error: e.message.slice(0, e.message.length - 4)
		})
	}
}