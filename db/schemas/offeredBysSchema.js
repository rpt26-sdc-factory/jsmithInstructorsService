const mongoose = require('mongoose');

const { Schema } = mongoose;

const offeredBysSchema = new Schema({
  _id: Number,
  offeredByIndex: { type: Number, required: true },
  offeredByName: { type: String, required: true },
  offeredByDescription: String,
});

module.exports = offeredBysSchema;
