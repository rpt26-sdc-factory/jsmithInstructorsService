/* eslint-disable global-require */
/* eslint-disable no-console */
/* eslint-disable radix */
require('dotenv').config();
const app = require('./api.js');
switch (process.env.NODE_ENV) {
  case 'mongo':
    require('../db/mongo/database.js');
    break;
  case 'cassandra':
    require('../db/cassandra/database.js');
    break;
  case 'postgres':
    require('../db/postgres/database.js');
    break;
  default:
    require('../db/mongo/database.js');
    break;
}

const port = process.env.SERVER_PORT;
const server = process.env.SERVER_HOST;

app.listen(port, () => {
  console.log(`Instructors service listening at http://${server}:${port}`);
});
