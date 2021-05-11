const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const {
  createInstructors,
  getAllInstructors,
  getInstructors,
  getPrimaryInstructor,
  setInstructor,
  deleteInstructor,
} = require('./controllers/instructors.js');
const {
  offeredBysInsert,
  getAllOfferedBys,
  getOfferedBys,
  setOfferedBy,
  deleteOfferedBy,
} = require('./controllers/offeredbys.js');
const {
  testimonialsInsert,
  getTestimonials,
  setTestimonial,
  deleteTestimonial,
} = require('./controllers/testimonials.js');

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
app.get('/api/allinstructors', getAllInstructors);
app.get('/api/instructors/:instructorId', getInstructors);
app.get('/api/primaryinstructor/:courseNumber', getPrimaryInstructor);
app.get('/api/offeredbyall', getAllOfferedBys);
app.get('/api/offeredbys/:courseNumbers', getOfferedBys);
app.get('/api/testimonials/:courseNumbers', getTestimonials);

// UPDATE
app.put('/api/instructors/:instructorid', setInstructor);
app.put('/api/offeredbys/:offeredbyid', setOfferedBy);
app.put('/api/testimonials/:testimonialid', setTestimonial);

// DELETE
app.delete('/api/instructors/:instructorid', deleteInstructor);
app.delete('/api/offeredbys/:courseNumber', deleteOfferedBy);
app.delete('/api/testimonals/:testimonialid', deleteTestimonial);

module.exports = app;
