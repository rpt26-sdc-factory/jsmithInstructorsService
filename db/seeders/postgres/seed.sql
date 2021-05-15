COPY coursera.instructor_details(firstname,middleinitial,lastname,academic_title,title,organization,learners,instructor_avg_rating,num_ratings)
FROM '/Users/rieuna/Documents/GitHub/vbao-instructor-service/db/seeders/withoutId/instructors_details.csv'
DELIMITER ','
CSV HEADER;

COPY coursera.primary_instructors(course_id,instructor_id)
FROM '/Users/rieuna/Documents/GitHub/vbao-instructor-service/db/seeders/withoutId/primary_instructors.csv'
DELIMITER ','
CSV HEADER;

COPY coursera.assistant_instructors(course_id,instructor_id)
FROM '/Users/rieuna/Documents/GitHub/vbao-instructor-service/db/seeders/withoutId/assistant_instructors.csv'
DELIMITER ','
CSV HEADER;

COPY coursera.offeredbys(offeredby_id,offeredby_name,offeredby_description)
FROM '/Users/rieuna/Documents/GitHub/vbao-instructor-service/db/seeders/withoutId/offeredbys.csv'
DELIMITER ','
CSV HEADER;

COPY coursera.testimonials(course_id,username,testimonial)
FROM '/Users/rieuna/Documents/GitHub/vbao-instructor-service/db/seeders/withoutId/testimonials.csv'
DELIMITER ','
CSV HEADER;