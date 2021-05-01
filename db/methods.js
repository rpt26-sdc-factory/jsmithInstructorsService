const instructorsInsert = require('./inserters/instructorsInserter.js');
const offeredBysInsert = require('./inserters/offeredBysInserter.js');
const testimonialsInsert = require('./inserters/testimonialsInserter.js');
const { getAllInstructors, getInstructors, getPrimaryInstructor } = require('./getters/instructorsGetters.js');
const { getAllOfferedBys, getOfferedBys } = require('./getters/offeredBysGetters.js');
const getTestimonials = require('./getters/testimonialsGetters.js');
const setInstructor = require('./setters/instructorsSetters.js');
const setOfferedBy = require('./setters/offeredBysSetters.js');
const setTestimonial = require('./setters/testimonialsSetters.js');
const deleteInstructor = require('./deleters/instructorsDeleters.js');
const deleteOfferedBy = require('./deleters/offeredBysDeleters.js');
const deleteTestimonial = require('./deleters/testimonialsDeleters.js');

module.exports = {
  instructorsInsert,
  offeredBysInsert,
  testimonialsInsert,
  getAllInstructors,
  getInstructors,
  getPrimaryInstructor,
  getAllOfferedBys,
  getOfferedBys,
  getTestimonials,
  setInstructor,
  setOfferedBy,
  setTestimonial,
  deleteInstructor,
  deleteOfferedBy,
  deleteTestimonial,
};
