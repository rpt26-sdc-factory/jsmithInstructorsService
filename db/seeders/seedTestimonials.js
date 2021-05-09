/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
/* eslint-disable no-console */
require('dotenv').config();
const mongoose = require('mongoose');
const { testimonialsInsert  } = require('./methods.js');

// const batch = async (batchSize, numBatches, timeElapsed) => {
//   const startTimer = new Date();
//   const instructors = generateInstructors(batchSize);
//   const offeredbys = generateOfferedBys(batchSize);
//   const testimonials = generateTestimonials(batchSize);

//   await instructorsInsert(instructors)
//     .then(() => offeredBysInsert(offeredbys))
//     .then(() => testimonialsInsert(testimonials))
//     .then(() => {
//       const endTimer = new Date();
//       const diff = endTimer - startTimer;
//       timeElapsed += diff;
//       const remainingBatches = numBatches - 1;
//       console.log(`Inserted ${batchSize} records: ${diff}ms. ${remainingBatches} remaining.`);
//       if (numBatches > 1) return batch(batchSize, remainingBatches, timeElapsed);
//       return console.log(`Total time elapsed: ${timeElapsed}ms`);
//     })
//     .catch((err) => console.error(err));
// };

const batch = async (batchSize) => {
  const startTimer = new Date();
  // const instructors = generateInstructors(batchSize);
  // const offeredbys = generateOfferedBys(batchSize);
  // const testimonials = generateTestimonials(batchSize);

  await testimonialsInsert(instructors)
    // .then(() => offeredBysInsert(offeredbys))
    // .then(() => testimonialsInsert(testimonials))
    .then(() => {
      const endTimer = new Date();
      console.log(endTimer - startTimer);
      return endTimer - startTimer;
    })
    .catch((err) => console.error(err.message));
};

const seed = async (batchSize, numBatches) => {
  await mongoose.connect(`mongodb://${process.env.DB_HOSTNAME}:${process.env.DB_PORT}/coursera`, { useNewUrlParser: true, useUnifiedTopology: true });

  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', () => {
    console.log(`The database has connected on mongodb://${process.env.DB_HOSTNAME}:${process.env.DB_PORT}/coursera`);
  });

  let count = numBatches;
  const store = [];
  while (count > 0) {
    store.push(batch(batchSize));
    count--;
  }

  return Promise.all(store);
  // db.close();
};

seed(10000, 1000);
