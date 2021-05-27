CREATE SCHEMA IF NOT EXISTS coursera;

CREATE TABLE IF NOT EXISTS coursera.instructor_details(
  instructor_id SERIAL PRIMARY KEY,
  firstname text NOT NULL,
  middleinitial text,
  lastname text NOT NULL,
  academic_title text,
  title text,
  organization text,
  learners int,
  instructor_avg_rating text,
  num_ratings int
);

CREATE TABLE IF NOT EXISTS coursera.assistant_instructors(
  assistant_id SERIAL PRIMARY KEY,
  course_id int,
  instructor_id int REFERENCES coursera.instructor_details ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS coursera.primary_instructors(
  course_id int PRIMARY KEY NOT NULL,
  instructor_id int REFERENCES coursera.instructor_details ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS coursera.offeredbys(
  course_id SERIAL PRIMARY KEY,
  offeredby_id int NOT NULL,
  offeredby_name text NOT NULL,
  offeredby_description text
);

CREATE TABLE IF NOT EXISTS coursera.testimonials(
  testimonial_id SERIAL PRIMARY KEY,
  course_id int NOT NULL,
  username text NOT NULL,
  testimonial text NOT NULL
);

CREATE INDEX index_assistant_instructors_course_id ON coursera.assistant_instructors(course_id);

CREATE INDEX index_assistant_instructors_instructor_id ON coursera.assistant_instructors(instructor_id);

CREATE INDEX index_primary_instructors_instructor_id ON coursera.primary_instructors(instructor_id);

CREATE INDEX index_offeredbys_offeredby_id ON coursera.offeredbys(offeredby_id);

CREATE INDEX index_testimonials_course_id ON coursera.testimonials(course_id);

CREATE SCHEMA IF NOT EXISTS test;

CREATE TABLE IF NOT EXISTS test.instructor_details(
  instructor_id SERIAL PRIMARY KEY,
  firstname text NOT NULL,
  middleinitial text,
  lastname text NOT NULL,
  academic_title text,
  title text,
  organization text,
  learners int,
  instructor_avg_rating text,
  num_ratings int
);

CREATE TABLE IF NOT EXISTS test.assistant_instructors(
  assistant_id SERIAL PRIMARY KEY,
  course_id int,
  instructor_id int REFERENCES test.instructor_details ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS test.primary_instructors(
  course_id int PRIMARY KEY NOT NULL,
  instructor_id int REFERENCES test.instructor_details ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS test.offeredbys(
  course_id SERIAL PRIMARY KEY,
  offeredby_id int NOT NULL,
  offeredby_name text NOT NULL,
  offeredby_description text
);

CREATE TABLE IF NOT EXISTS test.testimonials(
  testimonial_id SERIAL PRIMARY KEY,
  course_id int NOT NULL,
  username text NOT NULL,
  testimonial text NOT NULL
);

CREATE INDEX index_assistant_instructors_course_id ON test.assistant_instructors(course_id);

CREATE INDEX index_assistant_instructors_instructor_id ON test.assistant_instructors(instructor_id);

CREATE INDEX index_primary_instructors_instructor_id ON test.primary_instructors(instructor_id);

CREATE INDEX index_offeredbys_offeredby_id ON test.offeredbys(offeredby_id);

CREATE INDEX index_testimonials_course_id ON test.testimonials(course_id);
