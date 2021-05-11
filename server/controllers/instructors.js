/* eslint-disable no-underscore-dangle */
/* eslint-disable no-plusplus */
const { InstructorsModel } = require('../../db/models.js');

const createInstructors = async (req, res) => {
  const data = req.body;
  let maxID = await InstructorsModel.find().select('_id').sort([['_id', -1]]).limit(1);
  maxID = maxID[0]?._id ? maxID[0]._id : 0;
  Object.keys(data).forEach((key) => {
    maxID++;
    data[key]._id = maxID;
  });

  InstructorsModel.insertMany(data, (err, docs) => {
    if (err) return res.send(err.message).status(400);
    return res.send(docs);
  });
};

const getAllInstructors = (req, res) => {
  InstructorsModel.find({}, (err, docs) => {
    if (err || docs.length === 0) return res.send(err.message).status(400);
    return res.send(docs);
  });
};

const getInstructors = (req, res) => {
  const instructors = req.params.instructorId.split(',').map((id) => parseInt(id, 10));
  InstructorsModel.find({ _id: { $in: instructors } }, (err, docs) => {
    if (err || docs.length === 0) return res.send(err.message).status(400);
    return res.send(docs);
  });
};

const getPrimaryInstructor = (req, res) => {
  const courseId = parseInt(req.params.courseNumber, 10);
  const options = {
    courses: {
      $elemMatch: { courseNumber: courseId, isPrimaryInstructor: true },
    },
  };

  InstructorsModel.findOne(options, (err, docs) => {
    if (err || docs.length === 0) return res.send(err.message).status(400);
    return res.send(docs);
  });
};

const setInstructor = (req, res) => {
  const id = parseInt(req.params.instructorid, 10);
  const update = req.body;
  InstructorsModel.findOneAndUpdate(
    { _id: id },
    update,
    { new: true, useFindAndModify: false },
    (err, docs) => {
      if (err || docs.length === 0) return res.send(err.message).status(400);
      return res.send(docs);
    },
  );
};

const deleteInstructor = (req, res) => {
  const id = parseInt(req.params.instructorid, 10);
  InstructorsModel.findByIdAndRemove(id, (err, docs) => {
    if (err || docs.length === 0) return res.send(err.message).status(400);
    return res.send(docs);
  });
};

module.exports = {
  createInstructors,
  getAllInstructors,
  getInstructors,
  getPrimaryInstructor,
  setInstructor,
  deleteInstructor,
};
