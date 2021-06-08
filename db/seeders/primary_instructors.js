/* eslint-disable no-await-in-loop */
/* eslint-disable no-console */
/* eslint-disable no-plusplus */
require('dotenv').config();
const client = require('../postgres/database.js');

const batchSize = process.env.NODE_ENV === 'test' ? 100 : process.env.PRIMARY_RECORD_BATCH_SIZE;
const numBatches = process.env.NODE_ENV === 'test' ? 1 : process.env.PRIMARY_RECORD_BATCH_NUM;

const generatePrimaryInstructors = (numCourses) => {
  const primaryInstructors = [];
  for (let i = 1; i <= numCourses; i++) {
    const instructorId = Math.floor(Math.random() * numCourses) + 1;
    primaryInstructors.push({
      course_id: i,
      instructor_id: instructorId,
    });
  }
  return primaryInstructors;
};

(async () => {
  console.time('Insert 10 million primary instructors');
  const instructors = generatePrimaryInstructors(batchSize * numBatches);
  const insertSize = 10000;
  const numberInserts = Math.floor(instructors.length / insertSize);
  for (let i = 0; i < numberInserts; i++) {
    const pool = await client.connect();
    try {
      const sql = 'INSERT INTO coursera.primary_instructors (course_id,instructor_id) SELECT course_id,instructor_id FROM json_populate_recordset(NULL::coursera.primary_instructors, $1)';
      const option = [JSON.stringify(instructors.slice(i * insertSize, (i + 1) * insertSize))];
      await pool.query(sql, option);
    } catch (err) {
      console.error(err);
    } finally {
      pool.release();
    }
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    process.stdout.write(`--- Inserted ${(i + 1) * insertSize} ---\r`);
  }
  console.timeEnd('Insert 10 million primary instructors');
})();
