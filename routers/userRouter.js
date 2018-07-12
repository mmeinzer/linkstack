const express = require('express');
const userController = require('../controllers/userController')

const userRouter = express.Router();

userRouter.route('/register')
  .post(userController.register)
  .all((req, res) => res.status(404).json())

userRouter.route('/:id')
  .get(userController.getOne)

module.exports = userRouter;