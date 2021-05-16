/* eslint-disable consistent-return */
/* eslint-disable max-len */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-console */
require('dotenv').config();
const cass = require('cassandra-driver');

const client = new cass.Client({
  contactPoints: [`${process.env.DB_HOST}:${process.env.CASSANDRA_PORT}`],
  localDataCenter: 'datacenter1',
  keyspace: 'coursera',
});

(async () => {
  await client.connect()
    .then(() => console.log(`Connection to ${process.env.DB_HOST}:${process.env.CASSANDRA_PORT} has been successful!`))
    .catch((err) => console.error(err));

  console.log('CASSANDRA BENCHMARKING');
  console.log('INSTRUCTORS');
  console.time('CREATE instructors');
  let options = [10000001, 'Test', 'P.', 'Testerson', 'Test MD', 'Test Professor', 'Test University', 12345, '5', 123];
  let sql = 'INSERT INTO coursera.instructor_details (instructor_id, firstname, middleinitial, lastname, academic_title, title, organization, learners, instructor_avg_rating, num_ratings) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
  await client.execute(sql, options, { prepare: true }, (err) => {
    if (err) return console.error(err);
  });

  options = [10000001, 9490065];
  sql = 'INSERT INTO coursera.primary_instructors (course_id, instructor_id) VALUES (?, ?)';
  await client.execute(sql, options, { prepare: true }, (err) => {
    if (err) return console.error(err);
  });

  options = [15002497, 10000001, 10000001];
  sql = 'INSERT INTO coursera.assistant_instructors (assistant_id, course_id, instructor_id) VALUES (?, ?, ?)';
  await client.execute(sql, options, { prepare: true }, (err) => {
    if (err) return console.error(err);
  });
  console.timeEnd('CREATE instructors');

  console.time('READ instructors');
  const instructors = [];
  const response = await client.execute('SELECT instructor_id FROM coursera.primary_instructors WHERE course_id=10000001', [], { prepare: true });
  if (response.rows?.length) instructors.push(...response.rows);

  await Promise.all(instructors)
    .then(async (results) => {
      options = results.length > 1 ? results.join(',') : results[0];
      sql = 'SELECT * FROM coursera.instructor_details WHERE instructor_id IN (?)';
      await client.execute(sql, options, { prepare: true }, (err, res) => {
        if (err) return console.error(err);
        return console.log(res.rows[0]);
      });
    });
  console.timeEnd('READ instructors');

  console.time('UPDATE instructors');
  options = [1111, '4', 300, 10000001];
  sql = 'UPDATE coursera.instructor_details SET learners=?, instructor_avg_rating=?, num_ratings=? WHERE instructor_id=? IF EXISTS';
  await client.execute(sql, options, { prepare: true }, (err, results) => {
    if (err) return console.error(err.message);
    return console.log('UPDATE instructors: ', results.rows);
  });
  console.timeEnd('UPDATE instructors');

  console.time('DELETE instructors');
  sql = 'DELETE FROM coursera.instructor_details WHERE instructor_id=10000001 IF EXISTS';
  await client.execute(sql, [], { prepare: true }, (err, results) => {
    if (err) return console.error(err.message);
    return console.log(results.rows);
  });

  sql = 'DELETE FROM coursera.primary_instructors WHERE course_id=10000001 IF EXISTS';
  await client.execute(sql, [], { prepare: true }, (err, results) => {
    if (err) return console.error(err.message);
    return console.log(results.rows);
  });
  console.timeEnd('DELETE instructors');

  console.log('\n\nOFFERED BYS');
  console.time('CREATE offered bys');
  options = [10000001, 0, 'Test', 'This is a test.'];
  sql = 'INSERT INTO coursera.offeredbys (course_id, offeredby_id, offeredby_name, offeredby_description) VALUES (?, ?, ?, ?)';
  await client.execute(sql, options, { prepare: true }, (err) => {
    if (err) return console.error(err);
  });
  console.timeEnd('CREATE offered bys');

  console.time('READ offered bys');
  await client.execute('SELECT * FROM coursera.offeredbys WHERE course_id=10000001', [], { prepare: true }, (err, results) => {
    if (err) return console.error(err.message);
    return console.log('READ: ', results.rows);
  });
  console.timeEnd('READ offered bys');

  console.time('UPDATE offered bys');
  options = [7, 'Update Test', 'Update test description.', 10000001];
  sql = 'UPDATE coursera.offeredbys SET offeredby_id=?, offeredby_name=?, offeredby_description=? WHERE course_id=? IF EXISTS';
  await client.execute(sql, options, { prepare: true }, (err, results) => {
    if (err) return console.error(err.message);
    return console.log('UPDATE offered bys: ', results.rows);
  });
  console.timeEnd('UPDATE offered bys');

  console.time('DELETE offered bys');
  sql = 'DELETE FROM coursera.offeredbys WHERE course_id=10000001 IF EXISTS';
  await client.execute(sql, [], { prepare: true }, (err, results) => {
    if (err) return console.error(err.message);
    return console.log('DELETE: ', results.rows);
  });
  console.timeEnd('DELETE offered bys');

  console.log('\n\nTESTIMONIALS');
  console.time('CREATE testimonials');
  options = [30000000, 100000000, 'Test', 'This is a test.'];
  sql = 'INSERT INTO coursera.testimonials (testimonial_id, course_id, username, testimonial) VALUES (?, ?, ?, ?)';
  await client.execute(sql, options, { prepare: true }, (err) => {
    if (err) return console.error(err);
  });
  console.timeEnd('CREATE testimonials');

  console.time('READ testimonials');
  await client.execute('SELECT * FROM coursera.testimonials WHERE testimonial_id=30000000', [], { prepare: true }, (err, results) => {
    if (err) return console.error(err.message);
    return console.log('READ: ', results.rows);
  });
  console.timeEnd('READ testimonials');

  console.time('UPDATE testimonials');
  options = ['Update testimonial text.', 30000000];
  sql = 'UPDATE coursera.testimonials SET testimonial=? WHERE testimonial_id=? IF EXISTS';
  await client.execute(sql, options, { prepare: true }, (err, results) => {
    if (err) return console.error(err.message);
    return console.log('UPDATE testimonials: ', results.rows);
  });
  console.timeEnd('UPDATE testimonials');

  console.time('DELETE testimonials');
  sql = 'DELETE FROM coursera.testimonials WHERE testimonial_id=30000000 IF EXISTS';
  await client.execute(sql, [], { prepare: true }, (err, results) => {
    if (err) return console.error(err.message);
    return console.log('DELETE: ', results.rows);
  });
  console.timeEnd('DELETE testimonials');

  setTimeout(() => { client.shutdown(); }, 2000);
})();
