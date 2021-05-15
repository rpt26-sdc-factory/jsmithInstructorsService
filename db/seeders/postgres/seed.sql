COPY coursera.instructor_details(firstname,middleinitial,lastname,academic_title,title,organization,learners,instructor_avg_rating,num_ratings)
FROM '/Users/rieuna/Documents/GitHub/vbao-instructor-service/db/seeders/instructors_details.csv'
DELIMITER ','
CSV HEADER;

COPY coursera.primary_instructors(course_id,instructor_id)
FROM '/Users/rieuna/Documents/GitHub/vbao-instructor-service/db/seeders/primary_instructors.csv'
DELIMITER ','
CSV HEADER;

COPY coursera.assistant_instructors(course_id,instructor_id)
FROM '/Users/rieuna/Documents/GitHub/vbao-instructor-service/db/seeders/assistant_instructors.csv'
DELIMITER ','
CSV HEADER;

COPY coursera.offeredbys(offeredby_id,offeredby_name,offeredby_description)
FROM '/Users/rieuna/Documents/GitHub/vbao-instructor-service/db/seeders/offeredbys.csv'
DELIMITER ','
CSV HEADER;

COPY coursera.testimonials(course_id,username,testimonial)
FROM '/Users/rieuna/Documents/GitHub/vbao-instructor-service/db/seeders/testimonials.csv'
DELIMITER ','
CSV HEADER;