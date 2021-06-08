/* eslint-disable no-await-in-loop */
/* eslint-disable no-console */
/* eslint-disable no-plusplus */
require('dotenv').config();
const client = require('../postgres/database.js');

const batchSize = process.env.NODE_ENV === 'test' ? 100 : process.env.PRIMARY_RECORD_BATCH_SIZE;
const numBatches = process.env.NODE_ENV === 'test' ? 1 : process.env.PRIMARY_RECORD_BATCH_NUM;

const generateAssistantInstructors = (numCourses) => {
  const courses = [];
  for (let courseNumber = 1; courseNumber <= numCourses; courseNumber++) {
    const numberOfAssistants = Math.floor(Math.random() * 4);
    const assistants = [];

    while (assistants.length < numberOfAssistants) {
      const assistantIndex = Math.floor(Math.random() * numCourses) + 1;

      // prevents the same instructor from being added twice to the same course
      if (!assistants.includes(assistantIndex)) {
        assistants.push(assistantIndex);
      }
    }
    for (let i = 0; i < assistants.length; i++) {
      courses.push({
        course_id: courseNumber,
        instructor_id: assistants[i],
      });
    }
  }
  return courses;
};

(async () => {
  console.time('Insert 10 million courses\'s assistant instructors');
  const assistants = generateAssistantInstructors(batchSize * numBatches);
  const insertSize = 10000;
  const numberInserts = Math.floor(assistants.length / insertSize);
  for (let i = 0; i < numberInserts; i++) {
    const pool = await client.connect();
    try {
      const sql = 'INSERT INTO coursera.assistant_instructors (course_id,instructor_id) SELECT course_id,instructor_id FROM json_populate_recordset(NULL::coursera.assistant_instructors, $1)';
      const option = [JSON.stringify(assistants.slice(i * insertSize, (i + 1) * insertSize))];
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
  console.timeEnd('Insert 10 million courses\'s assistant instructors');
})();
