const express = require('express');
const { validate, catchErrors } = require('../../../helpers');
const controller = require('../controller');
const policy = require('../policies');

const router = express.Router();

router.post(
  '/',
  validate(policy.read),
  catchErrors(controller.read),
);

module.exports = router;
