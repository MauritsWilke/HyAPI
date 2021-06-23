require('dotenv').config()
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const app = require('express')();
const client = new MongoClient(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });



client.connect(err => {
	if (err) {
		console.log("failed to connect to database, aborting...");
		process.exit()
	}
	console.log("Connected to database")
	global.db = client.db("discordBot").collection("users");
});


app.listen(process.env.API_PORT, console.log(`API online on port ${process.env.API_PORT}`))


app.get(`/user`, async (req, res) => {
	try {
		const userQuery = typeof (req.query.name) == "object" ? req.query.name[0].toLowerCase() : req.query.name.toLowerCase();
		const userData = await db.find({ "username": userQuery }).toArray()
		if (!userData[0]) throw new Error(`User [${userQuery}] does not exist`)
		res.status(200).send({
			success: true,
			user: userData[0]
		})
	} catch (e) {
		console.log(e)
		res.status(404).json({
			success: false,
			error: e.message
		})
	}
});

// app.get(`/newuser`, async (req, res) => {
// 	try {
// 		const { username, id, displayName } = req.query;
// 		db.insertOne({
// 			username: username,
// 			discordID: id,
// 			displayName: displayName
// 		})
// 		res.send("Written to DB succesfully")
// 	} catch {

// 	}
// })

app.use((req, res) => {
	res.status(404).json({
		success: false,
		error: "path invalid"
	})
})