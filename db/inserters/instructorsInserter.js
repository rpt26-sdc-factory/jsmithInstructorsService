/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
const Promise = require('bluebird');
const { InstructorsModel } = require('../models.js');

const instructorsInsert = Promise.promisify(async (data, cb) => {
  try {
    // let maxID = await InstructorsModel.find().select('_id').sort([['_id', -1]]).limit(1);
    // maxID = maxID[0]?._id ? maxID[0]._id : 0;
    // Object.keys(data).forEach((key) => {
    //   maxID++;
    //   data[key]._id = maxID;
    // });
    const results = await InstructorsModel.insertMany(data);
    return cb(null, results);
  } catch (err) {
    return cb(err);
  }
});

module.exports = instructorsInsert;
