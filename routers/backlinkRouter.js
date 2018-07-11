const express = require('express');
const backlinkController = require('../controllers/backlinkController')

const backlinkRouter = express.Router();

backlinkRouter.route('/')
  .get(backlinkController.getAll)
  .post(backlinkController.createOne)

backlinkRouter.route('/:id')
  .get(backlinkController.getOne)

module.exports = backlinkRouter;