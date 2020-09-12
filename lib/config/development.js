module.exports = {
  mongo: {
    url: process.env.MONGODB_URL,
  },
  logger: {
    level: 'debug',
  },
  baseUrl: process.env.BASEURL,
};
