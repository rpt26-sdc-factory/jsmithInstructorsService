const Promise = require('bluebird');
const { InstructorsModel } = require('../models.js');

const getAllInstructors = Promise.promisify((cb) => {
  InstructorsModel.find()
    .then((results) => {
      cb(null, results);
    })
    .catch((err) => cb(err));
});

const getInstructors = Promise.promisify((courseIds, cb) => {
  InstructorsModel.find({ _id: { $in: courseIds } })
    .then((results) => {
      cb(null, results);
    })
    .catch((err) => cb(err));
});

const getPrimaryInstructor = Promise.promisify((courseId, cb) => {
  const options = { courses: { $elemMatch: { courseId, isPrimaryInstructor: true } } };
  InstructorsModel.findOne(options)
    .then((dbResponse) => cb(null, dbResponse))
    .catch((err) => cb(err));
});

module.exports = {
  getAllInstructors,
  getInstructors,
  getPrimaryInstructor,
};
