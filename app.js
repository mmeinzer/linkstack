const config = require('./config')
const express = require('express')
const setupMiddleware = require('./middleware')
const connect = require('./db')
const { apiRouter } = require('./routers')

const app = express()

setupMiddleware(app);

connect();

app.use('/api', apiRouter)

app.listen(config.port, () => console.log(`Listening on port ${config.port}`))
