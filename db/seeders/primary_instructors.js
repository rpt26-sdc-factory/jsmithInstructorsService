/* eslint-disable no-await-in-loop */
/* eslint-disable no-console */
/* eslint-disable no-plusplus */
require('dotenv').config();
const client = require('../postgres/database.js');

const batchSize = process.env.NODE_ENV === 'test' ? 100 : process.env.PRIMARY_RECORD_BATCH_SIZE;
const numBatches = process.env.NODE_ENV === 'test' ? 1 : process.env.PRIMARY_RECORD_BATCH_NUM;

const generatePrimaryInstructors = (numCourses, batch) => {
  const primaryInstructors = [];
  for (let i = 1; i <= numCourses; i++) {
    const instructorId = Math.floor(Math.random() * 10000000) + 1;
    primaryInstructors.push({
      course_id: i + (batch * numCourses),
      instructor_id: instructorId,
    });
  }
  return primaryInstructors;
};

(async () => {
  console.time('Insert 10 million primary instructors');
  for (let i = 0; i < numBatches; i++) {
    const pool = await client.connect();
    try {
      const instructors = generatePrimaryInstructors(batchSize, i);
      const sql = 'INSERT INTO coursera.primary_instructors (course_id,instructor_id) SELECT course_id,instructor_id FROM json_populate_recordset(NULL::coursera.primary_instructors, $1)';
      const option = [JSON.stringify(instructors)];
      await pool.query(sql, option);
    } catch (err) {
      console.error(err);
    } finally {
      pool.release();
    }
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    process.stdout.write(`--- Inserted ${batchSize * i} ---\r`);
  }
  console.timeEnd('Insert 10 million primary instructors');
})();
