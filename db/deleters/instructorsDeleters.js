const Promise = require('bluebird');
const { InstructorsModel } = require('../models.js');

const deleteInstructor = Promise.promisify((id, update, cb) => {
  InstructorsModel.findByIdAndRemove(id)
    .then((results) => {
      cb(null, results);
    })
    .catch((err) => cb(err));
});

module.exports = deleteInstructor;
