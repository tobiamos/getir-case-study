const mongoose = require('mongoose');
const moment = require('moment');
const { jsonResponse, ERROR_CODES } = require('../helpers');

const read = async (req, res) => {
  const Record = mongoose.model('record');

  const {
    startDate, endDate, minCount, maxCount,
  } = req.body;

  if (!moment(endDate).endOf('day').isAfter(moment(startDate))) {
    return jsonResponse(res, 400, ERROR_CODES.BADREQUEST, [], 'End Date must be after Start Date');
  }

  // create a match aggregation for the start and end dates
  const dateFilter = {
    $match: {
      createdAt: {
        $gte: moment(startDate).toDate(),
        $lte: moment(endDate).endOf('day').toDate(),
      },
    },
  };

  // sum the values in counts array and select other fields you will like to return in the response
  const projection = {
    $project: {
      totalCount: { $sum: '$counts' },
      key: '$key',
      createdAt: '$createdAt',
    },
  };

  // finally, filter totalCount based on the minCount and maxCount values
  const countFilter = {
    $match: {
      totalCount: {
        $gt: minCount,
        $lt: maxCount,
      },
    },
  };

  const records = await Record.aggregate([dateFilter, projection, countFilter]);

  if (!records.length) {
    return jsonResponse(res, 404, ERROR_CODES.NOTFOUND, [], 'Your query did not return any results :(');
  }

  return jsonResponse(res, 200, ERROR_CODES.SUCCESS, records, 'Success');
};

module.exports = {
  read,
};
