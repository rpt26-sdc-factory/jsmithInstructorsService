/* eslint-disable no-console */
const Promise = require('bluebird');
const testimonialsData = require('../data/testimonials.json');
const db = require('../models.js');

const testimonialsInsert = Promise.promisify(() => {
  db.TestimonialsModel.insertMany(testimonialsData, (err) => {
    if (err) {
      console.error(err);
    }
    console.log('testimonialsInsert success');
  });
});

module.exports.testimonialsInsert = testimonialsInsert;
