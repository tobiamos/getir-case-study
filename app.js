require('dotenv').config({ path: '.env' });

const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const addRequestId = require('express-request-id')();
const logger = require('./lib/services/logger');
const config = require('./lib/config');
const { jsonResponse, ERROR_CODES } = require('./lib/helpers');
const apiRoutes = require('./lib/records/route');

require('./lib/models');

const app = express();

morgan.token('id', (req) => req.id);

app.use(addRequestId);
app.use(helmet());
app.use(morgan(':id :method :url :response-time'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: '50mb' }));

app.use('/api/v1', apiRoutes);

app.use((req, res, next) => {
  const err = new Error('We apologize, there seems to be a problem with your request.');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => { //eslint-disable-line
  if (process.env.NODE_ENV !== 'test') {
    logger.error(`Internal Server Error ${err.message}`);
  }
  if (err.isBoom) {
    const { message } = err.data[0];
    jsonResponse(res, err.output.statusCode, err.output.statusCode, [], message);
  } else if (err.status === 404) {
    jsonResponse(res, err.status, ERROR_CODES.NOTFOUND, [], 'We apologize, there seems to be a problem with your request.');
  } else {
    jsonResponse(res, 500, ERROR_CODES.ERROR, [], err.message);
    throw err;
  }
});

app.listen(config.port, () => {
  logger.info(`Getir App running on ${config.baseUrl} in ${process.env.NODE_ENV} environment`);
});
