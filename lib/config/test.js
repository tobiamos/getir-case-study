module.exports = {
  mongo: {
    url: 'mongodb://127.0.0.1:27017/checkforme-test',
  },
  logger: {
    level: 'error',
  },
  baseUrl: 'http://localhost:9400',
  port: process.env.PORT || 9400,
};
