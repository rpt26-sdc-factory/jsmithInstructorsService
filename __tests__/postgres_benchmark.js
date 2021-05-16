/* eslint-disable no-console */
const client = require('../db/postgres/database.js');

(async () => {
  console.log('POSTGRES BENCHMARKING');
  console.log('INSTRUCTORS');
  console.time('CREATE instructors');
  let sql = {
    text: 'INSERT INTO coursera.instructor_details(firstname,middleinitial,lastname,academic_title,title,organization,learners,instructor_avg_rating,num_ratings) VALUES ($1::text, $2::text, $3::text, $4::text, $5::text, $6::text, $7::int, $8::text, $9::int)',
    values: ['Test', 'P.', 'Testerson', 'Test MD', 'Test Professor', 'Test University', 12345, '5', 123],
  };
  await client.query(sql);

  sql = {
    text: 'SELECT MAX(instructor_id) AS instructor_id FROM coursera.instructor_details',
    values: [],
  };
  let response = await client.query(sql);

  sql = {
    text: 'INSERT INTO coursera.assistant_instructors(course_id, instructor_id) VALUES ($1::int, $2::int)',
    values: [90002032, response.rows[0].instructor_id],
  };
  await client.query(sql);

  sql = {
    text: 'INSERT INTO coursera.primary_instructors(course_id, instructor_id) VALUES ($1, $2)',
    values: [10000012, response.rows[0].instructor_id],
  };
  await client.query(sql);
  console.timeEnd('CREATE instructors');

  console.time('READ instructors');
  sql = {
    text: 'SELECT * FROM coursera.instructor_details WHERE instructor_id IN (SELECT instructor_id FROM coursera.primary_instructors WHERE course_id = $1::int) OR instructor_id IN (SELECT instructor_id FROM coursera.assistant_instructors WHERE course_id = $1::int)',
    values: [10000012],
  };
  await client.query(sql);
  console.timeEnd('READ instructors');

  console.time('UPDATE instructors');
  sql = {
    text: 'UPDATE coursera.instructor_details SET firstname = $1::text WHERE instructor_id = $2::int',
    values: ['Testupdate', response.rows[0].instructor_id],
  };
  await client.query(sql);
  console.timeEnd('UPDATE instructors');

  console.time('DELETE instructors');
  sql = {
    text: 'DELETE FROM coursera.instructor_details WHERE instructor_id = $1::int',
    values: [response.rows[0].instructor_id],
  };
  await client.query(sql);
  sql = {
    text: 'DELETE FROM coursera.assistant_instructors WHERE instructor_id = $1::int',
    values: [response.rows[0].instructor_id],
  };
  await client.query(sql);
  sql = {
    text: 'DELETE FROM coursera.primary_instructors WHERE instructor_id = $1::int',
    values: [response.rows[0].instructor_id],
  };
  await client.query(sql);

  sql = {
    text: 'SELECT * FROM coursera.primary_instructors WHERE instructor_id = $1::int',
    values: [response.rows[0].instructor_id],
  };
  response = await client.query(sql);
  console.timeEnd('DELETE instructors');

  console.log('\n\nOFFERED BYS');
  console.time('CREATE offered bys');
  sql = {
    text: 'INSERT INTO coursera.offeredbys(offeredby_id, offeredby_name, offeredby_description) VALUES ($1::int, $2::text, $3::text)',
    values: [7, 'Test', 'Test description.'],
  };
  await client.query(sql);
  console.timeEnd('CREATE offered bys');

  sql = {
    text: 'SELECT MAX(course_id) AS course_id FROM coursera.offeredbys',
    values: [],
  };
  response = await client.query(sql);

  console.time('READ offered bys');
  sql = {
    text: 'SELECT * FROM coursera.offeredbys WHERE course_id=$1::int',
    values: [response.rows[0].course_id],
  };
  await client.query(sql);
  console.timeEnd('READ offered bys');

  console.time('UPDATE offered bys');
  sql = {
    text: 'UPDATE coursera.offeredbys SET offeredby_name = $1::text, offeredby_description=$2::text WHERE course_id = $3::int',
    values: ['Testupdate', 'Test updated description.', response.rows[0].course_id],
  };
  await client.query(sql);
  console.timeEnd('UPDATE offered bys');

  console.time('DELETE offered bys');
  sql = {
    text: 'DELETE FROM coursera.offeredbys WHERE course_id = $1',
    values: [response.rows[0].course_id],
  };
  await client.query(sql);
  console.timeEnd('DELETE offered bys');

  console.log('\n\nTESTIMONIALS');
  console.time('CREATE testimonials');
  sql = {
    text: 'INSERT INTO coursera.testimonials(course_id, username, testimonial) VALUES ($1::int, $2::text, $3::text)',
    values: [10000001, 'Test Name', 'This is a fake testimonial.'],
  };
  await client.query(sql);
  console.timeEnd('CREATE testimonials');

  sql = {
    text: 'SELECT MAX(testimonial_id) AS testimonial_id FROM coursera.testimonials',
    values: [],
  };
  response = await client.query(sql);

  console.time('READ testimonials');
  sql = {
    text: 'SELECT * FROM coursera.testimonials WHERE course_id=$1::int',
    values: [response.rows[0].testimonial_id],
  };
  await client.query(sql);
  console.timeEnd('READ testimonials');

  console.time('UPDATE testimonials');
  sql = {
    text: 'UPDATE coursera.testimonials SET username = $1::text, testimonial=$2::text WHERE course_id = $3::int',
    values: ['Testupdate', 'Test updated description.', response.rows[0].testimonial_id],
  };
  await client.query(sql);
  console.timeEnd('UPDATE testimonials');

  console.time('DELETE testimonials');
  sql = {
    text: 'DELETE FROM coursera.testimonials WHERE testimonial_id = $1::int',
    values: [response.rows[0].testimonial_id],
  };
  await client.query(sql);
  console.timeEnd('DELETE testimonials');

  await client.end();
})();
