CREATE TYPE courses (
  courseNumber int,
  isPrimaryInstructor boolean,
);

CREATE TABLE IF NOT EXISTS instructors (
  _id int PRIMARY KEY,
  firstName text,
  middleInitial text,
  lastName text,
  academicTitle text,
  titleorganization text,
  learners int,
  courses frozen<courses>,
  instructorAverageRating text,
  numberOfRatings int,
);

CREATE TABLE IF NOT EXISTS offeredbys (
  _id int PRIMARY KEY,
  offeredByIndex text,
  offeredByName text,
  offeredByDescription text,
);

CREATE TABLE IF NOT EXISTS testimonials (
  _id int PRIMARY KEY,
  courseNumber int,
  name text,
  testimonialText text,
);
