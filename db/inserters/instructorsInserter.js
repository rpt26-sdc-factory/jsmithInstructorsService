/* eslint-disable no-console */
const Promise = require('bluebird');
const instructorsData = require('../data/instructors.json');
const { InstructorsModel } = require('../models.js');

const instructorsInsert = Promise.promisify(() => {
  InstructorsModel.insertMany(instructorsData, (err) => {
    if (err) {
      console.error(err);
    }
    console.log('instructorsInsert success');
  });
});

instructorsInsert();
module.exports = instructorsInsert;
