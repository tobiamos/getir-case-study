const mongoose = require('mongoose');
const fs = require('fs');
const config = require('../config');

/* eslint-ignore */
fs.readdirSync(__dirname)
  .filter((file) => file.endsWith('.js') && file !== 'index.js')
  .map(file => require(`${__dirname}/${file}`)); // eslint-disable-line

mongoose.Promise = global.Promise;

const options = {
  reconnectTries: Number.MAX_VALUE,
  reconnectInterval: 500,
  poolSize: 10,
  bufferMaxEntries: 0,
  useNewUrlParser: true,
};

const connect = async (opts = options) => {
  if (mongoose.connection.readyState === 1) return;

  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(config.mongo.url, opts);

    if (process.env.NODE_ENV === 'development') {
      mongoose.set('debug', true);
    }
  }
};

module.exports = { connect };
