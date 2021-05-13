/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
/* eslint-disable no-console */
require('dotenv').config();
const fs = require('fs');
const mongoose = require('mongoose');
const { InstructorsModel } = require('../models.js');

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

// const batch = async (batchSize) => {
//   const startTimer = new Date();
//   // const instructors = generateInstructors(batchSize);
//   // const offeredbys = generateOfferedBys(batchSize);
//   // const testimonials = generateTestimonials(batchSize);

//   await instructorsInsert(instructors)
//     // .then(() => offeredBysInsert(offeredbys))
//     // .then(() => testimonialsInsert(testimonials))
//     .then(() => {
//       const endTimer = new Date();
//       console.log(endTimer - startTimer);
//       return endTimer - startTimer;
//     })
//     .catch((err) => console.error(err.message));
// };

const seed = async (numfiles) => {
  mongoose.connect(`mongodb://${process.env.DB_HOSTNAME}:${process.env.DB_PORT}/coursera`, { useNewUrlParser: true, useUnifiedTopology: true });

  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', () => {
    console.log(`The database has connected on mongodb://${process.env.DB_HOSTNAME}:${process.env.DB_PORT}/coursera`);
  });

  const files = [];
  for (let i = 1; i <= numfiles; i++) {
    files.push(`${__dirname}/instructors_${i}.json`);
  }

  files.forEach((file, index) => {
    const startTimer = new Date();
    const toInsert = require(file);
    let endTimer = new Date();
    console.log(`Parsed data: ${endTimer - startTimer}ms.`);
    InstructorsModel.insertMany(toInsert.slice(0, 100000), () => {
      endTimer = new Date();
      console.log(`Processed ${index + 1} file: ${endTimer - startTimer}ms.`);
    });
  });

  // files.forEach((file, index) => {
  //   const startTimer = new Date();
  //   fs.readFile(file, 'utf8', (readErr, data) => {
  //     if (readErr) return console.error(readErr.message);
  //     const toInsert = JSON.parse(data);
  //     let endTimer = new Date();
  //     console.log(`Parsed data: ${endTimer - startTimer}ms.`);
  //     InstructorsModel.insertMany(toInsert.slice(0, 100000), () => {
  //       endTimer = new Date();
  //       console.log(`Processed ${index + 1} file: ${endTimer - startTimer}ms.`);
  //     });
  //   });
  // });

  // Promise.all(store)
  //   .then((results) => results)
  //   .catch((err) => console.error(err.message))
  //   .finally(() => {
  //     db.close(() => console.log('Database closed.'));
  //   });
};

seed(1);
