const express = require('express');
const logger = require('morgan');
const passport = require('passport');

function setupMiddleware(app) {
  app.use(express.urlencoded({ extended: true }))
  app.use(express.json())
  app.use(passport.initialize())
  app.use(logger('dev'))
}

module.exports = setupMiddleware;