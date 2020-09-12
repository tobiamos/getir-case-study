const express = require('express');
const recordRoutes = require('./modules/records/routes');

const router = express.Router();

router.use('/records', recordRoutes);

module.exports = router;
