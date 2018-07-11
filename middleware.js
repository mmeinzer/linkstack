const express = require('express');
const logger = require('morgan');

function setupMiddleware(app) {
  app.use(express.urlencoded({ extended: true }))
  app.use(express.json())
  app.use(logger('dev'))
}

module.exports = setupMiddleware;