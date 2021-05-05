const Promise = require('bluebird');
const { OfferedBysModel } = require('../models.js');

const setOfferedBy = Promise.promisify((courseId, update, cb) => {
  OfferedBysModel.findOneAndUpdate({ _id: courseId }, update, { new: true })
    .then((results) => cb(null, results))
    .catch((err) => cb(err));
});

module.exports = setOfferedBy;
