const Promise = require('bluebird');
const { OfferedBysModel } = require('../models.js');

const getAllOfferedBys = Promise.promisify((cb) => {
  OfferedBysModel.find()
    .then((results) => cb(null, results))
    .catch((err) => cb(err));
});

const getOfferedBys = Promise.promisify((courseIds, cb) => {
  OfferedBysModel.find({ _id: { $in: courseIds } })
    .then((results) => cb(null, results))
    .catch((err) => cb(err));
});

module.exports = {
  getAllOfferedBys,
  getOfferedBys,
};
