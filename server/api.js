/* eslint-disable import/extensions */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable import/no-dynamic-require */
import Instructors from '../client/components/Instructors.jsx';

const fs = require('fs');
const React = require('react');
const ReactDOMServer = require('react-dom/server');

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
app.use(`/${process.env.LOADERIO}.txt`, express.static(path.join(__dirname, `../${process.env.LOADERIO}.txt`)));
app.use(cors());

app.get('/:courseNumber', (req, res) => {
  fs.readFile(path.resolve('./public/index.html'), 'utf8', (err, data) => {
    if (err) return res.status(500).send('Page could not be loaded!');
    return res.send(data.replace('<div id="root"></div>', `<div id="root">${ReactDOMServer.renderToString(<Instructors course={req.params.courseNumber} />)}</div>`));
  });
});

app.post('/api/instructors', createInstructors);
app.get('/api/instructors/:courseNumber', getInstructors);
app.get('/api/primaryinstructor/:courseNumber', getPrimaryInstructor);
app.put('/api/instructors/:instructorid', setInstructor);
app.delete('/api/instructors/:instructorid', deleteInstructor);

module.exports = app;
