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
  getAllInstructors((err, dbResponse) => {
    if (err) {
      res.send(err).status(400);
    } else {
      res.send(dbResponse);
    }
  });
});

// returns an array of instructors that belong to a course
app.get('/api/instructors/:courseNumber', (req, res) => {
  getInstructors(parseInt(req.params.courseNumber, 10), (dbResponse) => {
    res.send(dbResponse);
  });
});

// returns the primary instructor for a course
app.get('/api/primaryInstructor/:courseNumber', (req, res) => {
  getPrimaryInstructor(parseInt(req.params.courseNumber, 10), (dbResponse) => {
    res.send(dbResponse);
  });
});

// returns all offeredBy documents for all courses
app.get('/api/offeredByAll', (req, res) => {
  getAllOfferedBys((err, dbResponse) => {
    if (err) {
      res.send(err).status(400);
    } else {
      res.send(dbResponse);
    }
  });
});

// returns the offeredBy for a course
app.get('/api/offeredBy/:courseNumber', (req, res) => {
  getOfferedBys(parseInt(req.params.courseNumber, 10), (dbResponse) => {
    res.send(dbResponse);
  });
});

// returns three random testimonials
app.get('/api/testimonials/:courseNumber', (req, res) => {
  getTestimonials(parseInt(req.params.courseNumber, 10), (dbResponse) => {
    res.send(dbResponse);
  });
});

// UPDATE
app.put('', (req, res) => {
  test
});

app.put('', (req, res) => {
  test
});

app.put('', (req, res) => {
  test
});

// DELETE
app.delete('', (req, res) => {
  test
});

app.delete('', (req, res) => {
  test
});

app.delete('', (req, res) => {
  test
});

module.exports = app;
