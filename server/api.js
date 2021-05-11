const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const {
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
} = require('../db/methods.js');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../public')));
app.use(cors());

app.get('/:courseNumber', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../public/index.html'));
});

// CREATE
// Expects an array of instructor objects
app.post('/api/instructors', (req, res) => {
  instructorsInsert(req.body)
    .then((dbResponse) => res.send(dbResponse))
    .catch((err) => res.send(err).status(400));
});

// Expects an array of offeredBy objects
app.post('/api/offeredbys', (req, res) => {
  offeredBysInsert(req.body)
    .then((dbResponse) => res.send(dbResponse))
    .catch((err) => res.send(err).status(400));
});

// Expects an array of testimonial objects
app.post('/api/testimonals', (req, res) => {
  testimonialsInsert(req.body)
    .then((dbResponse) => res.send(dbResponse))
    .catch((err) => res.send(err).status(400));
});

// READ
// returns all instructors documents
app.get('/api/allinstructors', (req, res) => {
  getAllInstructors()
    .then((dbResponse) => res.send(dbResponse))
    .catch((err) => res.send(err).status(400));
});

// returns an array of instructors that belong to a course
app.get('/api/instructors/:instructorId', (req, res) => {
  const instructors = req.params.instructorId.split(',').map((id) => parseInt(id, 10));
  getInstructors(instructors)
    .then((dbResponse) => res.send(dbResponse))
    .catch((err) => res.send(err).status(400));
});

// returns the primary instructor for a course
app.get('/api/primaryinstructor/:courseNumber', (req, res) => {
  getPrimaryInstructor(parseInt(req.params.courseNumber, 10))
    .then((dbResponse) => res.send(dbResponse))
    .catch((err) => res.send(err).status(400));
});

// returns all offeredBy documents for all courses
app.get('/api/offeredbyall', (req, res) => {
  getAllOfferedBys()
    .then((dbResponse) => res.send(dbResponse))
    .catch((err) => res.send(err).status(400));
});

// returns the offeredBy per course
app.get('/api/offeredbys/:courseNumbers', (req, res) => {
  const courseNumbers = req.params.courseNumbers.split(',').map((id) => parseInt(id, 10));
  getOfferedBys(courseNumbers)
    .then((dbResponse) => res.send(dbResponse))
    .catch((err) => res.send(err).status(400));
});

// returns three random testimonials per course
app.get('/api/testimonials/:courseNumbers', (req, res) => {
  const courseNumbers = req.params.courseNumbers.split(',').map((id) => parseInt(id, 10));
  getTestimonials(courseNumbers)
    .then((dbResponse) => res.send(dbResponse))
    .catch((err) => res.send(err).status(400));
});

// UPDATE
app.put('/api/instructors/:instructorid', (req, res) => {
  setInstructor(parseInt(req.params.instructorid, 10), req.body)
    .then((dbResponse) => res.send(dbResponse))
    .catch((err) => res.send(err).status(400));
});

app.put('/api/offeredbys/:offeredbyid', (req, res) => {
  setOfferedBy(parseInt(req.params.offeredbyid, 10), req.body)
    .then((dbResponse) => res.send(dbResponse))
    .catch((err) => res.send(err).status(400));
});

app.put('/api/testimonials/:testimonialid', (req, res) => {
  setTestimonial(parseInt(req.params.testimonialid, 10), req.body)
    .then((dbResponse) => res.send(dbResponse))
    .catch((err) => res.send(err).status(400));
});

// DELETE
app.delete('/api/instructors/:instructorid', (req, res) => {
  deleteInstructor(parseInt(req.params.instructorid, 10))
    .then((dbResponse) => res.send(dbResponse))
    .catch((err) => res.send(err).status(400));
});

app.delete('/api/offeredbys/:courseNumber', (req, res) => {
  deleteOfferedBy(parseInt(req.params.courseNumber, 10))
    .then((dbResponse) => res.send(dbResponse))
    .catch((err) => res.send(err).status(400));
});

app.delete('/api/testimonals/:testimonialid', (req, res) => {
  deleteTestimonial(parseInt(req.params.testimonialid, 10))
    .then((dbResponse) => res.send(dbResponse))
    .catch((err) => res.send(err).status(400));
});

module.exports = app;
