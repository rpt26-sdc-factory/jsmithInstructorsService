CREATE KEYSPACE IF NOT EXISTS coursera
WITH replication = {'class':'SimpleStrategy', 'replication_factor' : 3};

CREATE TABLE IF NOT EXISTS coursera.instructor_details (
  instructor_id int PRIMARY KEY,
  firstname text,
  middleinitial text,
  lastname text,
  academic_title text,
  title text,
  organization text,
  learners int,
  instructor_avg_rating text,
  num_ratings int
);

CREATE TABLE IF NOT EXISTS coursera.primary_instructors (
  course_id int PRIMARY KEY,
  instructor_id int
);

CREATE TABLE IF NOT EXISTS coursera.assistant_instructors (
  assistant_id int,
  course_id int,
  instructor_id int,
  PRIMARY KEY (assistant_id, course_id)
);


CREATE TABLE IF NOT EXISTS coursera.offeredbys (
  course_id int PRIMARY KEY,
  offeredby_id int,
  offeredby_name text,
  offeredby_description text,
);

CREATE TABLE IF NOT EXISTS coursera.testimonials (
  testimonial_id int PRIMARY KEY,
  course_id int,
  username text,
  testimonial text,
);
