/* eslint-disable no-console */
/* eslint-disable radix */
require('dotenv').config();
require('../db/database.js');
const app = require('./api.js');

const port = process.env.SERVER_PORT;

app.listen(port, () => {
  console.log(`Instructors service listening at http://localhost:${port}`);
});
