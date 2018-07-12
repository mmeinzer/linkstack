const config = require('./config')
const express = require('express')
const setupMiddleware = require('./middleware')
const connect = require('./db')
const { apiRouter } = require('./routers')

const app = express()

// Middleware
setupMiddleware(app);

// Passport set-up
const User = require('./models/User');
const passport = require('passport')
passport.use(User.createStrategy())

// Database
connect();

//Router
app.use('/api', apiRouter)

app.listen(config.port, () => console.log(`Listening on port ${config.port}`))
