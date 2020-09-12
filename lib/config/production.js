module.exports = {
  mongo: {
    url: process.env.MONGODB_URL,
  },
  logger: {
    level: process.env.LOGGERLEVEL,
  },
  baseUrl: process.env.BASEURL,
};
