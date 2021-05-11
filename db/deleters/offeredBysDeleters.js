const Promise = require('bluebird');
const { OfferedBysModel } = require('../models.js');

const deleteOfferedBy = Promise.promisify((courseId, cb) => {
  OfferedBysModel.findByIdAndRemove(courseId)
    .then((results) => cb(null, results))
    .catch((err) => cb(err));
});

module.exports = deleteOfferedBy;
