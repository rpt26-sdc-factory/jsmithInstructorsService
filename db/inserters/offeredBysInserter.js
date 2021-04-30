/* eslint-disable no-console */
const Promise = require('bluebird');
const offeredBysData = require('../data/offeredBys.json');
const { OfferedBysModel } = require('../models.js');

const offeredBysInsert = Promise.promisify(() => {
  OfferedBysModel.insertMany(offeredBysData, (err) => {
    if (err) {
      console.error(err);
    }
    console.log('offeredBysInsert success');
  });
});

module.exports = offeredBysInsert;
