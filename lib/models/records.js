const mongoose = require('mongoose');

const RecordSchema = new mongoose.Schema({
  key: String,
  value: String,
  createdAt: Date,
  counts: [Number],
});

RecordSchema.index({
  createdAt: -1,
});

RecordSchema.set('collection', 'records');

const model = mongoose.model('record', RecordSchema);

module.exports = model;
