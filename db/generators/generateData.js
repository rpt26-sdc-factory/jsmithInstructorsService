const generateInstructors = require('./instructorsGenerator');
const generateOfferedBys = require('./offeredBysGenerator');
const generateTestimonials = require('./testimonialsGenerator');

const totalRecords = 10000000;
const instructors = generateInstructors(totalRecords);
const offeredBys = generateOfferedBys(totalRecords);
const testimonials = generateTestimonials(totalRecords);

module.exports = {
  instructors,
  offeredBys,
  testimonials,
};
