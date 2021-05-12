/* eslint-disable no-console */
require('dotenv').configure();
const cass = require('cassandra-driver');

const client = new cass.Client({
  contactPoints: [`${process.env.DB_HOST}:${process.env.CASS_PORT}`],
  localDataCenter: 'test',
  keyspace: 'coursera',
});

client.connect()
  .then((success) => console.log(success))
  .catch((err) => console.error(err));
