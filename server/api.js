/* eslint-disable import/no-dynamic-require */
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

const env = process.env.NODE_ENV === 'test' ? 'postgres' : process.env.NODE_ENV;

const {
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
} = require(`./controllers/${env}/controllers.js`);

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../public')));
app.use(cors());

app.get('/:courseNumber', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../public/index.html'));
});

// CREATE - expects array of objects
app.post('/api/instructors', createInstructors);
app.post('/api/offeredbys', offeredBysInsert);
app.post('/api/testimonals', testimonialsInsert);

// READ
app.get('/api/instructors/:courseNumber', getInstructors);
app.get('/api/primaryinstructor/:courseNumber', getPrimaryInstructor);
app.get('/api/offeredbys/:courseNumber', getOfferedBys);
app.get('/api/testimonials/:courseNumber', getTestimonials);

// UPDATE
app.put('/api/instructors/:instructorid', setInstructor);
app.put('/api/offeredbys/:courseNumber', setOfferedBy);
app.put('/api/testimonials/:testimonialid', setTestimonial);

// DELETE
app.delete('/api/instructors/:instructorid', deleteInstructor);
app.delete('/api/offeredbys/:courseNumber', deleteOfferedBy);
app.delete('/api/testimonals/:testimonialid', deleteTestimonial);

module.exports = app;
