const Promise = require('bluebird');
const { InstructorsModel } = require('../models.js');

const setInstructor = Promise.promisify((id, update, cb) => {
  InstructorsModel.findOneAndUpdate({ _id: id }, update, { new: true, useFindAndModify: false })
    .then((results) => {
      cb(null, results);
    })
    .catch((err) => cb(err));
});

module.exports = setInstructor;
