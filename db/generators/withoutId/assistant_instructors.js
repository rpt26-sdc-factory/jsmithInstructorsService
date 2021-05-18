/* eslint-disable no-console */
/* eslint-disable no-plusplus */
require('dotenv').config();
const fs = require('fs');

const generateAssistantInstructors = (numCourses) => {
  const courses = ['course_id,instructor_id'];
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
      courses.push(`${courseNumber},${assistants[i]}`);
    }
  }
  const stream = fs.createWriteStream('./db/seeders/assistant_instructors.csv', { flags: 'w' });
  const instructorsString = courses.join('\n');
  stream.write(instructorsString);
  return courses;
};

const start = new Date();
generateAssistantInstructors(10000000);
const end = new Date();
console.log('Time to complete: ', end - start, 'ms');

module.exports = generateAssistantInstructors;
