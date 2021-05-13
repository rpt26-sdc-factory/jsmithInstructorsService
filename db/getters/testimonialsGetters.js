const Promise = require('bluebird');
const { TestimonialsModel } = require('../models.js');

const getTestimonials = Promise.promisify((courseIds, cb) => {
  TestimonialsModel.find({ _id: { $in: courseIds } }, (err, docs) => {
    if (err || docs.length === 0) return cb(err);
    return cb(null, docs);
  });
});

module.exports = getTestimonials;
