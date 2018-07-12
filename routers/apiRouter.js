const express = require('express');
const backlinkRouter = require('./backlinkRouter')
const userRouter = require('./userRouter')

const apiRouter = express.Router();

apiRouter.use('/backlink', backlinkRouter)
apiRouter.use('/user', userRouter)

module.exports = apiRouter;