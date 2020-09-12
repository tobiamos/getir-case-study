require('dotenv').config({ path: '.env' });

const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const addRequestId = require('express-request-id')();
const logger = require('./lib/services/logger');
const config = require('./lib/config');
const { sendJSONResponse } = require('./lib/helpers');

require('./lib/models');

const app = express();

morgan.token('id', (req) => req.id);

app.use(addRequestId);
app.use(helmet());
app.use(morgan(':id :method :url :response-time'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: '50mb' }));

app.get('/', (req, res) => sendJSONResponse(res, 200, null, 'CURRENT API ROUTE AVAILABLE AT /api/v1 '));

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
    sendJSONResponse(res, err.output.statusCode, null, req.method, message);
  } else if (err.status === 404) {
    sendJSONResponse(res, err.status, null, req.method, 'We apologize, there seems to be a problem with your request.');
  } else {
    sendJSONResponse(res, 500, null, req.method, err.message);
    throw err;
  }
});

app.listen(config.port, () => {
  logger.info(`Getir App running on ${config.baseUrl} in ${process.env.NODE_ENV} environment`);
});
