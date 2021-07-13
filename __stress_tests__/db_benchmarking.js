/* eslint-disable max-len */
/* eslint-disable no-console */
const client = require('../db/postgres/database.js');

(async () => {
  const pool = client.connect();
  console.log('POSTGRES BENCHMARKING');
  console.log('INSTRUCTORS');
  console.time('CREATE instructors');
  let sql = {
    text: 'WITH new_instructor AS (INSERT INTO coursera.instructor_details(firstname,middleinitial,lastname,academic_title,title,organization,learners,instructor_avg_rating,num_ratings) VALUES ($1::text, $2::text, $3::text, $4::text, $5::text, $6::text, $7::int, $8::text, $9::int) RETURNING instructor_id), new_primary_instructor AS (INSERT INTO coursera.primary_instructors(course_id,instructor_id) VALUES ($10::int,(SELECT instructor_id FROM new_instructor))) INSERT INTO coursera.assistant_instructors(course_id,instructor_id) VALUES ($10::int,(SELECT instructor_id FROM new_instructor)) RETURNING instructor_id',
    values: ['Test', 'P.', 'Testerson', 'Test MD', 'Test Professor', 'Test University', 12345, '5', 123, 10000018],
  };
  let response = await pool.query(sql);
  console.timeEnd('CREATE instructors');

  console.time('READ instructors');
  sql = {
    text: 'WITH ids AS (SELECT instructor_id, is_primary_instructor FROM ((SELECT instructor_id, 1 AS is_primary_instructor FROM coursera.primary_instructors WHERE course_id = $1::int) UNION ALL (SELECT instructor_id, 0 AS is_primary_instructor FROM coursera.assistant_instructors WHERE course_id = $1::int)) t) SELECT * FROM coursera.instructor_details t1 INNER JOIN (SELECT * FROM ids) t2 ON t1.instructor_id=t2.instructor_id',
    values: [10000017],
  };
  await pool.query(sql);
  console.timeEnd('READ instructors');

  console.time('UPDATE instructors');
  sql = {
    text: 'UPDATE coursera.instructor_details SET firstname = $1::text WHERE instructor_id = $2::int',
    values: ['Testupdate', response.rows[0].instructor_id],
  };
  await pool.query(sql);
  console.timeEnd('UPDATE instructors');

  console.time('DELETE instructors');
  sql = {
    text: 'DELETE FROM coursera.instructor_details WHERE instructor_id = $1::int',
    values: [response.rows[0].instructor_id],
  };
  await pool.query(sql);
  console.timeEnd('DELETE instructors');

  console.log('\n\nOFFERED BYS');
  console.time('CREATE offered bys');
  sql = {
    text: 'INSERT INTO coursera.offeredbys(offeredby_id, offeredby_name, offeredby_description) VALUES ($1::int, $2::text, $3::text) RETURNING course_id',
    values: [7, 'Test', 'Test description.'],
  };
  response = await pool.query(sql);
  console.timeEnd('CREATE offered bys');

  console.time('READ offered bys');
  sql = {
    text: 'SELECT * FROM coursera.offeredbys WHERE course_id=$1::int',
    values: [response.rows[0].course_id],
  };
  await pool.query(sql);
  console.timeEnd('READ offered bys');

  console.time('UPDATE offered bys');
  sql = {
    text: 'UPDATE coursera.offeredbys SET offeredby_name = $1::text, offeredby_description=$2::text WHERE course_id = $3::int',
    values: ['Testupdate', 'Test updated description.', response.rows[0].course_id],
  };
  await pool.query(sql);
  console.timeEnd('UPDATE offered bys');

  console.time('DELETE offered bys');
  sql = {
    text: 'DELETE FROM coursera.offeredbys WHERE course_id = $1',
    values: [response.rows[0].course_id],
  };
  await pool.query(sql);
  console.timeEnd('DELETE offered bys');

  console.log('\n\nTESTIMONIALS');
  console.time('CREATE testimonials');
  sql = {
    text: 'INSERT INTO coursera.testimonials(course_id, username, testimonial) VALUES ($1::int, $2::text, $3::text) RETURNING testimonial_id',
    values: [10000001, 'Test Name', 'This is a fake testimonial.'],
  };
  response = await pool.query(sql);
  console.timeEnd('CREATE testimonials');

  console.time('READ testimonials');
  sql = {
    text: 'SELECT * FROM coursera.testimonials WHERE course_id=$1::int',
    values: [9999999],
  };
  await pool.query(sql);
  console.timeEnd('READ testimonials');

  console.time('UPDATE testimonials');
  sql = {
    text: 'UPDATE coursera.testimonials SET username = $1::text, testimonial=$2::text WHERE course_id = $3::int',
    values: ['Testupdate', 'Test updated description.', 29999999],
  };
  await pool.query(sql);
  console.timeEnd('UPDATE testimonials');

  console.time('DELETE testimonials');
  sql = {
    text: 'DELETE FROM coursera.testimonials WHERE testimonial_id = $1::int',
    values: [response.rows[0].testimonial_id],
  };
  await pool.query(sql);
  console.timeEnd('DELETE testimonials');

  await pool.release();
})();
