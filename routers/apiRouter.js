const express = require('express');
const backlinkRouter = require('./backlinkRouter')

const apiRouter = express.Router();

apiRouter.use('/backlink', backlinkRouter)

module.exports = apiRouter;