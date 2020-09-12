const joi = require('@hapi/joi').extend(require('@hapi/joi-date'));

const read = {
  body: {
    startDate: joi.date().format('YYYY-MM-DD').required().messages({
      'date.format': 'Date must be in YYY-MM-DD format',
      'string.empty': 'Start Date cannot be empty',
      'any.required': 'Start Date is a required field',
    }),
    endDate: joi.date().format('YYYY-MM-DD').required().messages({
      'date.format': 'Date must be in YYY-MM-DD format',
      'string.empty': 'End Date cannot be empty',
      'any.required': 'Start Date is a required field',
    }),
    minCount: joi.number().min(0).required().messages({
      'number.min': 'Min count should have a minimum value of 0',
    }),
    maxCount: joi.number().min(0).required().messages({
      'number.min': 'Max count should have a minimum value of 0',
    }),
  },
};

module.exports = {
  read,
};
