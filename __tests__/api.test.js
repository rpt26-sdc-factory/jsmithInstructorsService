require('dotenv').config();
const supertest = require('supertest');
const app = require('../server/api.js');
const mongoose = require('mongoose');
const { instructorsInsert, offeredBysInsert, testimonialsInsert } = require('../db/methods.js');
const instructorsData = require('../db/data/instructors.json');
const offeredBysData = require('../db/data/offeredByes.json');
const testimonialsData = require('../db/data/testimonials.json');

const request = supertest(app);

app.listen(process.env.SERVER_PORT);

mongoose.connect(`mongodb://${process.env.DB_HOSTNAME}:${process.env.DB_PORT}/test`, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

beforeAll(() => {
  // Seed test DB
});

afterAll(() => {
  mongoose.connection.close();
});

describe('test chunk', () => {
  test('test1', () => {});
});