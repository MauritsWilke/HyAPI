require('dotenv').config()
const app = require('express')();

// _ ROUTING                                                    
//const tracking = require(`./src/paths/tracking`)
const player = require(`./src/paths/player`)
const paths = require(`./src/paths/paths`)

// _ LINKING____________________________________________________
//app.use(`/tracking`, tracking)
app.use(`/player`, player)
app.use(`/paths`, paths)

app.listen(process.env.API_PORT, console.log(`API online on port ${process.env.API_PORT}`))
app.use((req, res) => {
	res.status(404).json({
		error: "invalid path"
	})
})