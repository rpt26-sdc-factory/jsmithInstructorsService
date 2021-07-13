ALTER TABLE coursera.assistant_instructors ADD FOREIGN KEY (instructor_id) REFERENCES coursera.instructor_details ON DELETE CASCADE;

ALTER TABLE coursera.primary_instructors ADD FOREIGN KEY (instructor_id) REFERENCES coursera.instructor_details ON DELETE CASCADE;

CREATE INDEX index_assistant_instructors_course_id ON coursera.assistant_instructors(course_id);

CREATE INDEX index_assistant_instructors_instructor_id ON coursera.assistant_instructors(instructor_id);

CREATE INDEX index_primary_instructors_instructor_id ON coursera.primary_instructors(instructor_id);

ALTER TABLE test.assistant_instructors ADD FOREIGN KEY (instructor_id) REFERENCES coursera.instructor_details ON DELETE CASCADE;

ALTER TABLE test.primary_instructors ADD FOREIGN KEY (instructor_id) REFERENCES coursera.instructor_details ON DELETE CASCADE;

CREATE INDEX index_assistant_instructors_course_id ON test.assistant_instructors(course_id);

CREATE INDEX index_assistant_instructors_instructor_id ON test.assistant_instructors(instructor_id);

CREATE INDEX index_primary_instructors_instructor_id ON test.primary_instructors(instructor_id);
