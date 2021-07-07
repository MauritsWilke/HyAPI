require('dotenv').config()
const app = require('express')();

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
app.use(`/player`, auth, player)
app.use(`/paths`, auth, paths)
app.use(`/key`, auth, keyInfo)
app.use(`/newkey`, newKey)
app.use(`/stats`, auth, stats)

app.listen(process.env.API_PORT, console.log(`API online on port ${process.env.API_PORT}`))
app.use((req, res) => {
	res.status(404).json({
		error: "invalid path"
	})
})