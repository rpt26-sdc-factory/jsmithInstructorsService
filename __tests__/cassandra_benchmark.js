/* eslint-disable no-unused-expressions */
/* eslint-disable no-console */
const client = require('../db/cassandra/database.js');

(async () => {
  console.log('CASSANDRA BENCHMARKING\n');
  console.log('INSTRUCTORS\n');
  console.time('CREATE instructors\n');
  let sql = 'INSERT INTO coursera.instructors ("_id", "firstName", "middleInitial", "lastName", "academicTitle", "title", "organization", "learners", "courses", "instructorAverageRating", "numberOfRatings") VALUES (10000001, Test, P, Testerson, Test MD, Test Professor, Test University, 12345, [{ courseNumber: 1, isPrimaryInstructor: false }], 5, 123) ALLOW FILTERING';
  await client.execute(sql, [], { prepare: true }, (err, results) => {
    if (err) return console.error(err);
    return console.log(results);
  });
  console.timeEnd('CREATE instructors\n');

  console.time('READ instructors\n');
  sql = 'SELECT * FROM coursera.instructors WHERE courses CONTAINS { "courseNumber": 1, "isPrimaryInstructor": false } ALLOW FILTERING';
  await client.execute(sql, [], { prepare: true }, (err, results) => {
    if (err) return console.error(err.message);
    return console.log(results);
  });
  console.timeEnd('READ instructors\n');

  console.time('UPDATE instructors\n');
  sql = 'UPDATE coursera.instructors SET learners=1111 WHERE "_id"=99123234';
  await client.execute(sql, [], { prepare: true }, (err, results) => {
    if (err) return console.error(err.message);
    return console.log(results);
  });
  console.timeEnd('UPDATE instructors\n');

  console.time('DELETE instructors\n');
  sql = 'DELETE FROM coursera.instructors WHERE "_id"=99123234 IF EXISTS';
  await client.execute(sql, [], { prepare: true }, (err, results) => {
    if (err) return console.error(err.message);
    return console.log(results.length);
  });
  console.timeEnd('DELETE instructors\n');

  // console.log('OFFERED BYS\n');
  // STUFF HERE

  // console.log('TESTIMONIALS\n');
  // console.time('POST testimonials\n');
  // STUFF HERE

  // setTimeout(() => { client.shutdown(); }, 2000);
})();
