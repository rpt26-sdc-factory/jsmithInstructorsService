/* eslint-disable no-console */
const Promise = require('bluebird');
const { TestimonialsModel } = require('../models.js');

const testimonialsInsert = Promise.promisify(async (data, cb) => {
  try {
    let maxID = await TestimonialsModel.find().select('_id').sort(-'_id').limit(1);
    maxID = maxID[0]?._id ? maxID[0]._id : 0;
    for (const datum of data) {
      maxID++;
      datum._id = maxID;
    }
    const results = await TestimonialsModel.insertMany(data);
    return cb(null, results);
  } catch (err) {
    return cb(err);
  }
});

module.exports = testimonialsInsert;
