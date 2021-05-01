const mongoose = require('mongoose');

const { Schema } = mongoose;

const courses = new Schema({
  courseNumber: Number,
  isPrimaryInstructor: Boolean,
}, { _id: false });

const instructorsSchema = new Schema({
  _id: Number,
  firstName: String,
  middleInitial: String,
  lastName: String,
  academicTitle: String,
  title: String,
  organization: String,
  learners: Number,
  courses: [courses],
  instructorAverageRating: String,
  numberOfRatings: Number,
});

module.exports = instructorsSchema;
