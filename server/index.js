/* eslint-disable global-require */
/* eslint-disable no-console */
/* eslint-disable radix */
require('dotenv').config();
require('@babel/register')({
  ignore: [/(node_modules)/],
  presets: ['@babel/preset-env', '@babel/preset-react'],
});
const app = require('./api.js');

const port = process.env.SERVER_PORT;
const server = process.env.SERVER_HOST;

app.listen(port, () => {
  console.log(`Instructors service listening at http://${server}:${port}`);
});
