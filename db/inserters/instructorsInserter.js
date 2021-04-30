/* eslint-disable no-console */
const Promise = require('bluebird');
const { InstructorsModel } = require('../models.js');

const instructorsInsert = Promise.promisify((data, cb) => {
  InstructorsModel.insertMany(data)
    .then((results) => cb(null, results))
    .catch((err) => cb(err));
});

module.exports = instructorsInsert;
