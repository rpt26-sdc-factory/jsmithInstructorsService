const Promise = require('bluebird');
const { TestimonialsModel } = require('../models.js');

const getAllTestimonials = Promise.promisify((courseIds, cb) => {
  TestimonialsModel.find()
    .then((results) => cb(null, results))
    .catch((err) => cb(err));
});

const getTestimonials = Promise.promisify((courseIds, cb) => {
  TestimonialsModel.find({ _id: { $in: courseIds } })
    .then((results) => cb(null, results))
    .catch((err) => cb(err));
});

module.exports = {
  getAllTestimonials,
  getTestimonials,
};
