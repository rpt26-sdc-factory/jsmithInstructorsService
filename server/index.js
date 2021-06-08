/* eslint-disable global-require */
/* eslint-disable no-console */
/* eslint-disable radix */
require('dotenv').config();
const app = require('./api.js');

const port = process.env.SERVER_PORT;
const server = process.env.SERVER_HOST;

app.listen(port, () => {
  console.log(`Instructors service listening at http://${server}:${port}`);
});
