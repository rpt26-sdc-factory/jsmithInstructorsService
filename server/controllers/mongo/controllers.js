const {
  createInstructors,
  getAllInstructors,
  getInstructors,
  getPrimaryInstructor,
  setInstructor,
  deleteInstructor,
} = require('./instructors.js');
const {
  offeredBysInsert,
  getAllOfferedBys,
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
  getAllInstructors,
  getInstructors,
  getPrimaryInstructor,
  setInstructor,
  deleteInstructor,
  offeredBysInsert,
  getAllOfferedBys,
  getOfferedBys,
  setOfferedBy,
  deleteOfferedBy,
  testimonialsInsert,
  getTestimonials,
  setTestimonial,
  deleteTestimonial,
};
