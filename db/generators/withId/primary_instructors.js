/* eslint-disable no-console */
/* eslint-disable no-plusplus */
require('dotenv').config();
const fs = require('fs');

const generatePrimaryInstructors = (numCourses) => {
  const primaryInstructors = ['course_id,instructor_id'];
  for (let i = 1; i <= numCourses; i++) {
    const instructorId = Math.floor(Math.random() * numCourses);
    primaryInstructors.push(`${i},${instructorId}`);
  }

  const stream = fs.createWriteStream('./db/seeders/id_primary_instructors.csv', { flags: 'w' });
  const instructorsString = primaryInstructors.join('\n');
  stream.write(instructorsString);
  return primaryInstructors;
};

console.time('Generate primary_instructors');
generatePrimaryInstructors(10000000);
console.timeEnd('Generate primary_instructors');

module.exports = generatePrimaryInstructors;
