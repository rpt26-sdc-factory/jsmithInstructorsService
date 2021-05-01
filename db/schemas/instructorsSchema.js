const mongoose = require('mongoose');

const { Schema } = mongoose;

const instructorsSchema = new Schema({
  _id: Number,
  firstName: String,
  middleInitial: String,
  lastName: String,
  academicTitle: String,
  title: String,
  organization: String,
  learners: Number,
  courses: [{
    courseNumber: Number,
    isPrimaryInstructor: Boolean,
  }],
  instructorAverageRating: String,
  numberOfRatings: Number,
});

module.exports = instructorsSchema;
