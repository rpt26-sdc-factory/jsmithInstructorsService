/* eslint-disable no-console */
require('dotenv').config();
const cass = require('cassandra-driver');

const client = new cass.Client({
  contactPoints: [`${process.env.DB_HOST}:${process.env.CASSANDRA_PORT}`],
  localDataCenter: 'datacenter1',
  keyspace: 'coursera',
});

client.connect()
  .then(() => console.log(`Connection to ${process.env.DB_HOST}:${process.env.CASSANDRA_PORT} has been successful!`))
  .catch((err) => console.error(err));
