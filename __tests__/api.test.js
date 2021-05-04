require('dotenv').config();
const supertest = require('supertest');
const app = require('../server/api.js');
const mongoose = require('mongoose');
const { InstructorsModel, OfferedBysModel, TestimonialsModel } = require('../db/models.js');
const { instructorsInsert, offeredBysInsert, testimonialsInsert } = require('../db/methods.js');
const instructorsData = require('../db/data/instructors.json');
const offeredBysData = require('../db/data/offeredBys.json');
const testimonialsData = require('../db/data/testimonials.json');

const request = supertest(app);

mongoose.connect(`mongodb://${process.env.DB_HOSTNAME}:${process.env.DB_PORT}/test`, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

beforeAll(async (done) => {
  await InstructorsModel.remove({});
  await OfferedBysModel.remove({});
  await TestimonialsModel.remove({});
  await instructorsInsert(instructorsData);
  await offeredBysInsert(offeredBysData);
  await testimonialsInsert(testimonialsData);
  done();
});

afterAll(async (done) => {
  await mongoose.connection.close();
  done();
});

describe('test chunk', () => {
  test('test1', () => {
    expect(true).toEqual(true);
  });
});