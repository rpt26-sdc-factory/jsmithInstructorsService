const Promise = require('bluebird');
const { InstructorsModel } = require('../models.js');

const getAllInstructors = Promise.promisify((cb) => {
  InstructorsModel.find({}, (err, docs) => {
    if (err || docs.length === 0) return cb(err);
    return cb(null, docs);
  });
});

const getInstructors = Promise.promisify((id, cb) => {
  InstructorsModel.find({ _id: { $in: id } }, (err, docs) => {
    if (err || docs.length === 0) return cb(err);
    return cb(null, docs);
  });
});

const getPrimaryInstructor = Promise.promisify((courseId, cb) => {
  const options = {
    courses: {
      $elemMatch: { courseNumber: courseId, isPrimaryInstructor: true },
    },
  };

  InstructorsModel.findOne(options, (err, docs) => {
    if (err || docs.length === 0) return cb(err);
    return cb(null, docs);
  });
});

module.exports = {
  getAllInstructors,
  getInstructors,
  getPrimaryInstructor,
};
