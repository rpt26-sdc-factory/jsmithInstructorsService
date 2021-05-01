const mongoose = require('mongoose');

const { Schema } = mongoose;

const testimonialsSchema = new Schema({
  _id: Number,
  courseNumber: Number,
  name: String,
  testimonialText: String,
});

module.exports = testimonialsSchema;
