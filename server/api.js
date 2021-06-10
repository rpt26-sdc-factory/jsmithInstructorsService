/* eslint-disable import/no-dynamic-require */
require('newrelic');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

const {
  createInstructors,
  getInstructors,
  getPrimaryInstructor,
  setInstructor,
  deleteInstructor,
} = require('./controllers/controllers.js');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../public')));
app.use('/loaderio.txt', express.static(path.join(__dirname, '../loaderio.txt')));
app.use(cors());

app.get('/:courseNumber', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../public/index.html'));
});

app.post('/api/instructors', createInstructors);
app.get('/api/instructors/:courseNumber', getInstructors);
app.get('/api/primaryinstructor/:courseNumber', getPrimaryInstructor);
app.put('/api/instructors/:instructorid', setInstructor);
app.delete('/api/instructors/:instructorid', deleteInstructor);

module.exports = app;
