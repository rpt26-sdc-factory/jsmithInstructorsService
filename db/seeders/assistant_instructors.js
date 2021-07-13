/* eslint-disable no-await-in-loop */
/* eslint-disable no-console */
/* eslint-disable no-plusplus */
require('dotenv').config();
const client = require('../postgres/database.js');

const batchSize = process.env.NODE_ENV === 'test' ? 100 : process.env.PRIMARY_RECORD_BATCH_SIZE / 10;
const numBatches = process.env.NODE_ENV === 'test' ? 1 : process.env.PRIMARY_RECORD_BATCH_NUM * 10;

const generateAssistantInstructors = (numCourses, batch) => {
  const courses = [];
  for (let courseNumber = 1; courseNumber <= numCourses; courseNumber++) {
    const numberOfAssistants = Math.floor(Math.random() * 4);
    const assistants = [];

    while (assistants.length < numberOfAssistants) {
      const assistantIndex = Math.floor(Math.random() * 10000000) + 1;

      // prevents the same instructor from being added twice to the same course
      if (!assistants.includes(assistantIndex)) {
        assistants.push(assistantIndex);
      }
    }
    for (let i = 0; i < assistants.length; i++) {
      courses.push({
        course_id: courseNumber + (batch * numCourses),
        instructor_id: assistants[i],
      });
    }
  }
  return courses;
};

(async () => {
  console.time('Insert 10 million courses\'s assistant instructors');
  for (let i = 0; i < numBatches; i++) {
    const pool = await client.connect();
    try {
      const assistants = generateAssistantInstructors(batchSize, i);
      const sql = 'INSERT INTO coursera.assistant_instructors (course_id,instructor_id) SELECT course_id,instructor_id FROM json_populate_recordset(NULL::coursera.assistant_instructors, $1)';
      const option = [JSON.stringify(assistants)];
      await pool.query(sql, option);
    } catch (err) {
      console.error(err);
    } finally {
      pool.release();
    }
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    process.stdout.write(`--- Inserted ${(i + 1) * batchSize} ---\r`);
  }
  console.timeEnd('Insert 10 million courses\'s assistant instructors');
})();
