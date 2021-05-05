const Promise = require('bluebird');
const { TestimonialsModel } = require('../models.js');

const setTestimonial = Promise.promisify((courseId, update, cb) => {
  TestimonialsModel.findOneAndUpdate({ _id: courseId }, update, { new: true })
    .then((results) => cb(null, results))
    .catch((err) => cb(err));
});

module.exports = setTestimonial;
