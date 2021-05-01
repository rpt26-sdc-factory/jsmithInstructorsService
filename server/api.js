require('../db/database.js');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const instructorsInsert = require('../db/inserters/instructorsInserter.js');
const offeredBysInsert = require('../db/inserters/offeredBysInserter.js');
const testimonialsInsert = require('../db/inserters/testimonialsInserter.js');
const { getAllInstructors, getInstructors, getPrimaryInstructor } = require('../db/getters/instructorsGetters.js');
const { getAllOfferedBys, getOfferedBys } = require('../db/getters/offeredBysGetters.js');
const getTestimonials = require('../db/getters/testimonialsGetters.js');
const setInstructor = require('../db/setters/instructorsSetters.js');
const setOfferedBy = require('../db/setters/offeredBysSetters.js');
const setTestimonial = require('../db/setters/testimonialsSetters.js');
const deleteInstructor = require('../db/deleters/instructorsDeleters.js');
const deleteOfferedBy = require('../db/deleters/offeredBysDeleters.js');
const deleteTestimonial = require('../db/deleters/testimonialsDeleters.js');

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
app.post('/api/addinstructors', (req, res) => {
  instructorsInsert(req.body)
    .then((dbResponse) => res.send(dbResponse))
    .catch((err) => res.send(err).status(400));
});

// Expects an array of offeredBy objects
app.post('/api/addofferedbys', (req, res) => {
  offeredBysInsert(req.body)
    .then((dbResponse) => res.send(dbResponse))
    .catch((err) => res.send(err).status(400));
});

// Expects an array of testimonial objects
app.post('/api/addtestimonals', (req, res) => {
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
app.get('/api/instructors/:courseNumbers', (req, res) => {
  const courseNumbers = req.params.courseNumbers.split(',').map((id) => parseInt(id, 10));
  getInstructors(courseNumbers)
    .then((dbResponse) => res.send(dbResponse))
    .catch((err) => res.send(err).status(400));
});

// returns the primary instructor for a course
app.get('/api/primaryInstructor/:courseNumber', (req, res) => {
  getPrimaryInstructor(parseInt(req.params.courseNumber, 10))
    .then((dbResponse) => res.send(dbResponse))
    .catch((err) => res.send(err).status(400));
});

// returns all offeredBy documents for all courses
app.get('/api/offeredByAll', (req, res) => {
  getAllOfferedBys()
    .then((dbResponse) => res.send(dbResponse))
    .catch((err) => res.send(err).status(400));
});

// returns the offeredBy per course
app.get('/api/offeredBy/:courseNumbers', (req, res) => {
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
app.put('/api/editinstructor/:instructorid', (req, res) => {
  setInstructor(parseInt(req.params.instructorid, 10), req.body)
    .then((dbResponse) => res.send(dbResponse))
    .catch((err) => res.send(err).status(400));
});

app.put('/api/editofferedby/:offeredbyid', (req, res) => {
  setOfferedBy(parseInt(req.params.offeredbyid, 10), req.body)
    .then((dbResponse) => res.send(dbResponse))
    .catch((err) => res.send(err).status(400));
});

app.put('/api/edittestimonal/:testimonialid', (req, res) => {
  setTestimonial(parseInt(req.params.testimonialid, 10), req.body)
    .then((dbResponse) => res.send(dbResponse))
    .catch((err) => res.send(err).status(400));
});

// DELETE
app.delete('/api/deleteinstructor/:instructorid', (req, res) => {
  deleteInstructor(parseInt(req.params.instructorid, 10))
    .then((dbResponse) => res.send(dbResponse))
    .catch((err) => res.send(err).status(400));
});

app.delete('/api/deleteofferedby/:courseNumber', (req, res) => {
  deleteOfferedBy(parseInt(req.params.courseNumber, 10))
    .then((dbResponse) => res.send(dbResponse))
    .catch((err) => res.send(err).status(400));
});

app.delete('/api/deletetestimonal/:testimonialid', (req, res) => {
  deleteTestimonial(parseInt(req.params.testimonialid, 10))
    .then((dbResponse) => res.send(dbResponse))
    .catch((err) => res.send(err).status(400));
});

module.exports = app;
