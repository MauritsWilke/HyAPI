require('dotenv').config()
const express = require(`express`)
const app = express();
const { readFile } = require(`fs`).promises

// _ ROUTING                                                    
const auth = require(`./src/middleware/auth`);
const newKey = require(`./src/routers/newKey`);
const keyInfo = require(`./src/routers/keyInfo`);
//const tracking = require(`./src/paths/tracking`)
const player = require(`./src/routers/player`);
const paths = require(`./src/routers/paths`);
const stats = require(`./src/routers/stats`)

// _ LINKING____________________________________________________
//app.use(`/tracking`, tracking)
app.use(`/api`, paths)
app.use(`/api/player`, auth, player)
app.use(`/api/key`, auth, keyInfo)
app.use(`/api/newkey`, newKey)
app.use(`/api/stats`, auth, stats)
//app.use(`/`, express.static('../Client/public'))

app.listen(process.env.API_PORT, console.log(`API online on port ${process.env.API_PORT}`))
app.use((req, res) => {
	res.status(404).json({
		error: "invalid path"
	})
})