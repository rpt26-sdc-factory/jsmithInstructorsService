/* eslint-disable no-console */
const client = require('../db/postgres/database.js');

(async () => {
  console.log('POSTGRES BENCHMARKING\n');
  console.log('INSTRUCTORS\n');
  console.time('CREATE instructors');
  let sql = {
    text: 'INSERT INTO coursera.instructor_details(firstname,middleinitial,lastname,academic_title,title,organization,learners,instructor_avg_rating,num_ratings) VALUES ($1::text, $2::text, $3::text, $4::text, $5::text, $6::text, $7::int, $8::text, $9::int)',
    values: ['Test', 'P.', 'Testerson', 'Test MD', 'Test Professor', 'Test University', 12345, '5', 123],
  };
  const newInstructor = await client.query(sql);
  sql = {
    text: 'INSERT INTO coursera.assistant_instructors(course_id, instructor_id) VALUES ($1, $2)',
    values: [90002032, newInstructor.instructor_id],
  };
  await client.query(sql);
  sql = {
    text: 'INSERT INTO coursera.primary_instructors(course_id, instructor_id) VALUES ($1, $2)',
    values: [10000007, newInstructor.instructor_id],
  };
  await client.query(sql);
  console.timeEnd('CREATE instructors');

  console.time('READ instructors');
  sql = {
    text: 'SELECT * FROM coursera.instructor_details WHERE instructor_id IN (SELECT instructor_id FROM coursera.primary_instructors WHERE course_id = $1) OR instructor_id IN (SELECT instructor_id FROM coursera.assistant_instructors WHERE course_id = $1)',
    values: [1],
  };
  await client.query(sql);
  console.timeEnd('READ instructors');

  console.time('UPDATE instructors');
  sql = {
    text: 'UPDATE coursera.instructor_details SET firstname = $1 WHERE instructor_id = $2',
    values: ['Testupdate', 98888888],
  };
  await client.query(sql);
  console.timeEnd('UPDATE instructors');

  console.time('DELETE instructors');
  sql = {
    text: 'DELETE FROM coursera.instructor_details WHERE instructor_id = $1',
    values: [98888890],
  };
  await client.query(sql);
  sql = {
    text: 'DELETE FROM coursera.assistant_instructors WHERE instructor_id = $1',
    values: [98888890],
  };
  await client.query(sql);
  sql = {
    text: 'DELETE FROM coursera.primary_instructors WHERE instructor_id = $1',
    values: [98888890],
  };
  await client.query(sql);
  console.timeEnd('DELETE instructors');

  await client.end();
})();
