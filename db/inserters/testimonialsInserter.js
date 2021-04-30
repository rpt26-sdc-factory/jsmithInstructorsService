/* eslint-disable no-console */
const Promise = require('bluebird');
const { TestimonialsModel } = require('../models.js');

const testimonialsInsert = Promise.promisify((data, cb) => {
  TestimonialsModel.insertMany(data, cb)
    .then((results) => cb(null, results))
    .catch((err) => cb(err));
});

module.exports = testimonialsInsert;
