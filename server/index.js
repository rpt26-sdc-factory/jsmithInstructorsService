/* eslint-disable global-require */
/* eslint-disable no-console */
/* eslint-disable radix */
require('dotenv').config();
require('@babel/register')({
  ignore: [/(node_modules)/],
  presets: ['@babel/preset-env', '@babel/preset-react'],
});
const fs = require('fs');
const React = require('react');
const ReactDOMServer = require('react-dom/server');

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const Instructors = require('../client/components/Instructors.jsx').default;

const port = process.env.SERVER_PORT;
const server = process.env.SERVER_HOST;

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
app.use('/', express.static(path.join(__dirname, '../public')));
app.use('/server.js', express.static(path.join(__dirname, '../server/server.js')));
app.use('/instructors.js', express.static(path.join(__dirname, '../client/components/instructors.js')));
app.use(`/${process.env.LOADERIO}.txt`, express.static(path.join(__dirname, `../${process.env.LOADERIO}.txt`)));
app.use(cors());

app.get('/:courseNumber', (req, res) => {
  fs.readFile(path.resolve('./public/index.html'), 'utf8', (err, data) => {
    if (err) return res.status(500).send('Page could not be loaded!');
    const component = React.createElement(Instructors, { 'course': req.params.courseNumber });
    const rendered = ReactDOMServer.renderToString(component);
    return res.end(data.replace('<div id="instructors"></div>', `<div id="instructors">${rendered}</div>`));
  });
});

app.post('/api/instructors', createInstructors);
app.get('/api/instructors/:courseNumber', getInstructors);
app.get('/api/primaryinstructor/:courseNumber', getPrimaryInstructor);
app.put('/api/instructors/:instructorid', setInstructor);
app.delete('/api/instructors/:instructorid', deleteInstructor);

app.listen(port, () => {
  console.log(`Instructors service listening at http://${server}:${port}`);
});
