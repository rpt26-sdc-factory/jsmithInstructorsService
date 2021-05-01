const Promise = require('bluebird');
const { TestimonialsModel } = require('../models.js');

const deleteTestimonial = Promise.promisify((courseId, update, cb) => {
  TestimonialsModel.findByIdAndRemove(courseId)
    .then((results) => cb(null, results))
    .catch((err) => cb(err));
});

module.exports = deleteTestimonial;
