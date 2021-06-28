require('dotenv').config()
const MongoClient = require('mongodb').MongoClient;
const app = require('express')();
const client = new MongoClient(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// _ ROUTING                                                    
const tracking = require(`./src/paths/tracking`)
const player = require(`./src/paths/player`)

// _ LINKING____________________________________________________
app.use(`/tracking`, tracking)
app.use(`/player`, player)

client.connect(err => {
	if (err) {
		console.log("failed to connect to database, aborting...");
		process.exit()
	}
	console.log("Connected to database")
	global.db = client.db("hyAPI").collection("tracking");
})
app.listen(process.env.API_PORT, console.log(`API online on port ${process.env.API_PORT}`))
app.use((req, res) => {
	res.status(404).json({
		success: false,
		error: "path invalid"
	})
})