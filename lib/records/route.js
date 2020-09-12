const express = require('express');
const { validate, catchErrors } = require('../helpers');
const controller = require('./controller');
const policy = require('./policy');

const router = express.Router();

router.post(
  '/records',
  validate(policy.read),
  catchErrors(controller.read),
);

module.exports = router;
