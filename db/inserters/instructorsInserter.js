/* eslint-disable no-console */
const Promise = require('bluebird');
const { InstructorsModel } = require('../models.js');

const instructorsInsert = Promise.promisify(async (data, cb) => {
  try {
    let maxID = await InstructorsModel.find().select('_id').sort(-'_id').limit(1);
    maxID = maxID[0]?._id ? maxID[0]._id : 0;
    for (const datum of data) {
      maxID++;
      datum._id = maxID;
    }
    const results = await InstructorsModel.insertMany(data);
    return cb(null, results);
  } catch (err) {
    return cb(err);
  }
});

module.exports = instructorsInsert;
