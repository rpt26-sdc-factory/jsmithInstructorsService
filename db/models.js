/* eslint-disable no-console */
require('dotenv').config();
const mongoose = require('mongoose');
const instructorsSchema = require('./schemas/instructorsSchema.js');
const testimonialsSchema = require('./schemas/testimonialsSchema.js');
const offeredBysSchema = require('./schemas/offeredBysSchema.js');

const DB_INSTRUCTORS = process.env.DB_INSTRUCTORS || 'instructors';
const DB_OFFEREDBYS = process.env.DB_OFFEREDBYS || 'offeredbys';
const DB_TESTIMONIALS = process.env.DB_TESTIMONIALS || 'testimonials';

const InstructorsModel = mongoose.model(DB_INSTRUCTORS, instructorsSchema);
const OfferedBysModel = mongoose.model(DB_OFFEREDBYS, offeredBysSchema);
const TestimonialsModel = mongoose.model(DB_TESTIMONIALS, testimonialsSchema);

module.exports = {
  InstructorsModel,
  OfferedBysModel,
  TestimonialsModel,
};
