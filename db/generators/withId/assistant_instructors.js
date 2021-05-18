/* eslint-disable no-console */
/* eslint-disable no-plusplus */
require('dotenv').config();
const fs = require('fs');

const batchSize = process.env.NODE_ENV === 'test' ? 100 : process.env.PRIMARY_RECORD_BATCH_SIZE;
const numBatches = process.env.NODE_ENV === 'test' ? 1 : process.env.PRIMARY_RECORD_BATCH_NUM;

const generateAssistantInstructors = (numCourses, count) => {
  const courses = [];
  for (let courseid = 1, id = 1 + ((count - 1) * numCourses); courseid <= numCourses; courseid++) {
    const numberOfAssistants = Math.floor(Math.random() * 4);
    const assistants = [];

    while (assistants.length < numberOfAssistants) {
      const assistantIndex = Math.floor(Math.random() * numCourses);

      // prevents the same instructor from being added twice to the same course
      if (!assistants.includes(assistantIndex)) {
        assistants.push(assistantIndex);
      }
    }
    for (let i = 0; i < assistants.length; i++) {
      courses.push(`${id},${courseid},${assistants[i]}`);
      id++;
    }
  }
  const stream = fs.createWriteStream('./db/seeders/id_assistant_instructors.csv', { flags: 'a' });
  for (let rows = 0; rows < courses.length; rows += 100000) {
    const instructorsString = rows === 0 ? `\n${courses.splice(0, 100000).join('\n')}` : courses.splice(0, 100000).join('\n');
    stream.write(instructorsString);
  }
  return courses;
};

const stream = fs.createWriteStream('./db/seeders/id_assistant_instructors.csv', { flags: 'w' });
stream.write('assistant_id,course_id,instructor_id');
let count = 1;
console.time('Generate assistant_instructors');
while (count <= numBatches) {
  generateAssistantInstructors(batchSize, count);
  count++;
}
console.timeEnd('Generate assistant_instructors');

module.exports = generateAssistantInstructors;
