const mongoose = require('mongoose');

const { Schema } = mongoose;

const testimonialsSchema = new Schema({
  _id: Number,
  courseNumber: { type: Number, required: true},
  name: { type: String, required: true},
  testimonialText: { type: String, required: true},
});

module.exports = testimonialsSchema;
