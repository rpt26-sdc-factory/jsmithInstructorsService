const Promise = require('bluebird');
const { OfferedBysModel } = require('../models.js');

const getAllOfferedBys = Promise.promisify((cb) => {
  OfferedBysModel.find({}, (err, docs) => {
    if (err || docs.length === 0) return cb(err);
    return cb(null, docs);
  });
});

const getOfferedBys = Promise.promisify((courseIds, cb) => {
  OfferedBysModel.find({ _id: { $in: courseIds } }, (err, docs) => {
    if (err || docs.length === 0) return cb(err);
    return cb(null, docs);
  });
});

module.exports = {
  getAllOfferedBys,
  getOfferedBys,
};
