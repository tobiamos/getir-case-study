const mongoose = require('mongoose');
const models = require('../lib/models');

const wipeMongo = async () => {
  await models.connect();
  await Promise.all(Object.keys(mongoose.connection.collections).map(async (key) => {
    await mongoose.connection.collections[key].deleteMany({ });
  }));
};

module.exports = {
  wipeMongo,
};
