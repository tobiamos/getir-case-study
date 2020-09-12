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

module.exports = mongoose.model('record', RecordSchema);
