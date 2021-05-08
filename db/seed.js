/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
/* eslint-disable no-console */
require('dotenv').config();
const mongoose = require('mongoose');
const { instructorsInsert, offeredBysInsert, testimonialsInsert } = require('./methods.js');
const { generateInstructors, generateOfferedBys, generateTestimonials } = require('./generators/generateData.js');

const batch = async (name, dataFunction, insertFunction, batchSize, numBatches) => {
  const startTimer = new Date();
  const data = dataFunction(batchSize);
  await insertFunction(data)
    .then(() => {
      const endTimer = new Date();
      console.log(`Inserted ${batchSize} ${name}'s: ${endTimer - startTimer} seconds. ${numBatches - 1} remaining.`);
      if (numBatches > 1) batch(name, dataFunction, insertFunction, batchSize, numBatches--);
    })
    .catch((err) => console.error(err));
};

const seed = async (batchSize, numBatches) => {
  mongoose.connect(`mongodb://${process.env.DB_HOSTNAME}:${process.env.DB_PORT}/coursera`, { useNewUrlParser: true, useUnifiedTopology: true });

  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', () => {
    console.log(`The database has connected on mongodb://${process.env.DB_HOSTNAME}:${process.env.DB_PORT}/coursera`);
  });

  await batch('Instructor', generateInstructors, instructorsInsert, batchSize, numBatches);
  await batch('OfferedBy', generateOfferedBys, offeredBysInsert, batchSize, numBatches);
  await batch('Testimonial', generateTestimonials, testimonialsInsert, batchSize, numBatches);

  // db.close();
};

seed(100, 1);
