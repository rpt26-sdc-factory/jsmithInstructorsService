/* eslint-disable no-underscore-dangle */
/* eslint-disable no-plusplus */
const { OfferedBysModel } = require('../../db/models.js');

const offeredBysInsert = async (req, res) => {
  const data = req.body;
  let maxID = await OfferedBysModel.find().select('_id').sort([['_id', -1]]).limit(1);
  maxID = maxID[0]?._id ? maxID[0]._id : 0;
  Object.keys(data).forEach((key) => {
    maxID++;
    data[key]._id = maxID;
  });

  OfferedBysModel.insertMany(data, (err, docs) => {
    if (err) return res.status(400).send(err.message);
    return res.send(docs);
  });
};

const getAllOfferedBys = (req, res) => {
  OfferedBysModel.find({}, (err, docs) => {
    if (err || docs.length === 0) return res.status(400).send(err?.message || 'No records found.');
    return res.send(docs);
  });
};

const getOfferedBys = (req, res) => {
  const courseNumbers = req.params.courseNumbers.split(',').map((id) => parseInt(id, 10));
  OfferedBysModel.find({ _id: { $in: courseNumbers } }, (err, docs) => {
    if (err || docs.length === 0) return res.status(400).send(err?.message || 'No records found.');
    return res.send(docs);
  });
};

const setOfferedBy = (req, res) => {
  const courseId = parseInt(req.params.offeredbyid, 10);
  const update = req.body;

  OfferedBysModel.findOneAndUpdate(
    { _id: courseId },
    update,
    { new: true, useFindAndModify: false },
    (err, docs) => {
      if (err || !docs) return res.status(400).send(err?.message || 'No records found.');
      return res.send(docs);
    },
  );
};

const deleteOfferedBy = (req, res) => {
  const courseId = parseInt(req.params.courseNumber, 10);
  OfferedBysModel.findByIdAndRemove(courseId, (err, docs) => {
    if (err) return res.status(400).send(err.message);
    return res.send(docs);
  });
};

module.exports = {
  offeredBysInsert,
  getAllOfferedBys,
  getOfferedBys,
  setOfferedBy,
  deleteOfferedBy,
};
