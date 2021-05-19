const {
  createInstructors,
  getInstructors,
  getPrimaryInstructor,
  setInstructor,
  deleteInstructor,
} = require('./instructors.js');
const {
  offeredBysInsert,
  getOfferedBys,
  setOfferedBy,
  deleteOfferedBy,
} = require('./offeredbys.js');
const {
  testimonialsInsert,
  getTestimonials,
  setTestimonial,
  deleteTestimonial,
} = require('./testimonials.js');

module.exports = {
  createInstructors,
  getInstructors,
  getPrimaryInstructor,
  setInstructor,
  deleteInstructor,
  offeredBysInsert,
  getOfferedBys,
  setOfferedBy,
  deleteOfferedBy,
  testimonialsInsert,
  getTestimonials,
  setTestimonial,
  deleteTestimonial,
};
