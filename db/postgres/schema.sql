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

CREATE INDEX index_assistant_instructors_course_id ON coursera.assistant_instructors(course_id);

CREATE INDEX index_assistant_instructors_instructor_id ON coursera.assistant_instructors(instructor_id);

CREATE INDEX index_primary_instructors_instructor_id ON coursera.primary_instructors(instructor_id);

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

CREATE INDEX index_assistant_instructors_course_id ON test.assistant_instructors(course_id);

CREATE INDEX index_assistant_instructors_instructor_id ON test.assistant_instructors(instructor_id);

CREATE INDEX index_primary_instructors_instructor_id ON test.primary_instructors(instructor_id);
