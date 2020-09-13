const request = require('supertest');
const mongoose = require('mongoose');
const { wipeMongo } = require('./utils');
const models = require('../lib/models');
const app = require('../app');

describe('records api', () => {
  beforeEach(async () => {
    await wipeMongo();
  });

  test('filter with empty request body', async () => {
    const res = await request(app)
      .post('/api/v1/records')
      .send({})
      .expect(400);

    expect(res.body).toMatchSnapshot();
  });

  test('filter with wrong date format', async () => {
    const res = await request(app)
      .post('/api/v1/records')
      .send({
        startDate: '2020/02/01',
        endDate: '2020-02-01',
        minCount: 200,
        maxCount: 500,
      });

    expect(res.body).toMatchSnapshot();
  });

  test('filter with end date before start date', async () => {
    const res = await request(app)
      .post('/api/v1/records')
      .send({
        startDate: '2020-02-02',
        endDate: '2020-02-01',
        minCount: 200,
        maxCount: 500,
      });

    expect(res.body).toMatchSnapshot();
  });

  test('filter with min count less than 0', async () => {
    const res = await request(app)
      .post('/api/v1/records')
      .send({
        startDate: '2020-02-02',
        endDate: '2020-02-01',
        minCount: -1,
        maxCount: 500,
      });

    expect(res.body).toMatchSnapshot();
  });

  test('filter with emtpy results in the response', async () => {
    const res = await request(app)
      .post('/api/v1/records')
      .send({
        startDate: '2020-02-01',
        endDate: '2020-02-01',
        minCount: 100,
        maxCount: 500,
      });

    expect(res.body).toMatchSnapshot();
  });

  test('filter with min count greater than max count', async () => {
    const res = await request(app)
      .post('/api/v1/records')
      .send({
        startDate: '2020-02-01',
        endDate: '2020-02-01',
        minCount: 1000,
        maxCount: 500,
      });

    expect(res.body).toMatchSnapshot();
  });

  test('filter with results in the response', async () => {
    await models.connect();

    const records = [{
      counts: [20, 30],
      key: 'VtXguuOz',
      createdAt: '2016-01-01T23:08:54.343Z',
    },
    {
      counts: [30, 3600],
      key: 'HjKCYMrZ',
      createdAt: '2016-01-01T18:57:47.340Z',
    },
    ];

    await mongoose.model('record').insertMany(records);

    const res = await request(app)
      .post('/api/v1/records')
      .send({
        startDate: '2012-01-01',
        endDate: '2017-02-01',
        minCount: 10,
        maxCount: 10000,
      });

    expect(res.body.records[0]).toMatchSnapshot({
      _id: expect.anything(),
    });
  });
});
