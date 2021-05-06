/* eslint-disable no-console */
require('dotenv').config();
const mongoose = require('mongoose');
const { instructorsInsert, offeredBysInsert, testimonialsInsert } = require('./methods.js');
const { generateInstructors, generateOfferedBys, generateTestimonials } = require('../db/generators/generateData.js');

const seed = async () => {
  mongoose.connect(`mongodb://${process.env.DB_HOSTNAME}:${process.env.DB_PORT}/coursera`, { useNewUrlParser: true, useUnifiedTopology: true });

  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', () => {
    console.log(`The database has connected on mongodb://${process.env.DB_HOSTNAME}:${process.env.DB_PORT}/coursera`);
  });

  const initialRecords = 10000;
  const instructors = generateInstructors(initialRecords);
  const offeredBys = generateOfferedBys(initialRecords);
  const testimonials = generateTestimonials(initialRecords);

  await instructorsInsert(instructors)
    .then(() => console.log('Inserted instructors.'))
    .catch((err) => console.error(err));

  await offeredBysInsert(offeredBys)
    .then(() => console.log('Inserted offeredBys.'))
    .catch((err) => console.error(err));

  await testimonialsInsert(testimonials)
    .then(() => console.log('Inserted testimonials.'))
    .catch((err) => console.error(err));

  db.close();
};

seed();
