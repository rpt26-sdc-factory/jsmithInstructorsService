CREATE TYPE IF NOT EXISTS courses (
  "courseNumber" int,
  "isPrimaryInstructor" boolean,
);

CREATE TABLE IF NOT EXISTS coursera.instructors (
  "_id" int PRIMARY KEY,
  "firstName" text,
  "middleInitial" text,
  "lastName" text,
  "academicTitle" text,
  "title" text,
  "organization" text,
  "learners" int,
  "courses" list <frozen<courses>>,
  "instructorAverageRating" text,
  "numberOfRatings" int,
);

CREATE TABLE IF NOT EXISTS coursera.offeredbys (
  "_id" int PRIMARY KEY,
  "offeredByIndex" text,
  "offeredByName" text,
  "offeredByDescription" text,
);

CREATE TABLE IF NOT EXISTS coursera.testimonials (
  "_id" int PRIMARY KEY,
  "courseNumber" int,
  "name" text,
  "testimonialText" text,
);
