const Promise = require('bluebird');
const { InstructorsModel } = require('../models.js');

const deleteInstructor = Promise.promisify((id, cb) => {
  InstructorsModel.findByIdAndRemove(id)
    .then(() => {
      cb(null, 'Successfully deleted.');
    })
    .catch((err) => cb(err));
});

module.exports = deleteInstructor;
