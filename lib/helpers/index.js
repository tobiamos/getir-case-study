const { badRequest } = require('@hapi/boom');
const joi = require('@hapi/joi');

const jsonResponse = (res, status, code, records, msg) => {
  res.status(status);

  res.json({
    msg,
    code,
    records,
  });
};

const catchErrors = (fn) => (req, res, next) => fn(req, res, next).catch(next);

const validate = (schema) => function validateRequest(req, res, next) {
  const toValidate = {};

  if (!schema) {
    return next();
  }

  ['params', 'body', 'query'].forEach((key) => {
    if (schema[key]) {
      toValidate[key] = req[key];
    }
  });

  const JoiSchema = joi.object(schema);

  const { error, value } = JoiSchema.validate(toValidate);

  if (error) {
    return next(badRequest(error.message, error.details));
  }

  Object.assign(req, value);

  return next();
};

const ERROR_CODES = {
  SUCCESS: 0,
  NOTFOUND: 404,
  ERROR: 500,
  BADREQUEST: 400,
};

module.exports = {
  jsonResponse,
  catchErrors,
  validate,
  ERROR_CODES,
};
