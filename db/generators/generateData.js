const fs = require('fs');
const generateInstructors = require('./instructorsGenerator');
const generateOfferedBys = require('./offeredBysGenerator');
const generateTestimonials = require('./testimonialsGenerator');

const totalRecords = 100;
const instructors = generateInstructors(totalRecords);
const offeredBys = generateOfferedBys(totalRecords);
const testimonials = generateTestimonials(totalRecords);

fs.writeFileSync('./db/data/instructors.json', JSON.stringify(instructors, null, '\t'));
fs.writeFileSync('./db/data/offeredBys.json', JSON.stringify(offeredBys, null, '\t'));
fs.writeFileSync('./db/data/testimonials.json', JSON.stringify(testimonials, null, '\t'));
