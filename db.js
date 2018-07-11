const mongoose = require('mongoose');
const config = require('./config')

mongoose.Promise = global.Promise;

const options = {
  useNewUrlParser: true,
};

require('./models/Backlink');
require('./models/User');

const connect = (url = config.db.url) => {
  return mongoose.connect(url, options)
}

module.exports = connect