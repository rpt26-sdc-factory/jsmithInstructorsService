/* eslint-disable no-console */
const Promise = require('bluebird');
const { OfferedBysModel } = require('../models.js');

const offeredBysInsert = Promise.promisify((data, cb) => {
  OfferedBysModel.insertMany(data)
    .then((results) => cb(null, results))
    .catch((err) => cb(err));
});

module.exports = offeredBysInsert;
