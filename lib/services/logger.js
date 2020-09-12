const bunyan = require('bunyan');
const config = require('../config');

module.exports = bunyan.createLogger({
  name: 'getir-api',
  level: config.logger.level,
});
