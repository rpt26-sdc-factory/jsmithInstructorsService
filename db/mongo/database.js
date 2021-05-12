/* eslint-disable no-console */
require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(`mongodb://${process.env.DB_HOST}:${process.env.MONGO_PORT}/coursera`, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log(`The database has connected on mongodb://${process.env.LOCALHOST}:${process.env.MONGO_PORT}/coursera`);
});
