/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
/* eslint-disable no-plusplus */
/* eslint-disable no-nested-ternary */
require('dotenv').config();
const faker = require('faker');
const fs = require('fs');

const generateInstructors = (entries, filenum) => {
  const instructors = [];

  const schools = [
    'Alfred University',
    'Baylor University',
    'Centenary University',
    'Dallas Christian College',
    'East Carolina University',
    'Farmingdale State College',
    'Georgia Institute of Technology-Main Campus',
    'Hofstra University',
    'Indiana Institute of Technology',
    'Jewish Theological Seminary of America',
    'Keiser University-Ft Lauderdale',
    'Lewis University',
    'Marian University',
    'Northwestern State University of Louisiana',
    'Ohio State University',
    'Pacific Islands University',
    'Queens University of Charlotte',
    'Radford University',
    'Saint Mary\'s College of California',
    'Toccoa Falls College',
    'University of Central Arkansas',
    'Vincennes University',
    'Wright State University',
    'Xavier University',
    'Youngstown State University',
    'Zaytuna College',
  ]; // Pulled manually from https://nces.ed.gov/collegenavigator

  // creates n instructors
  const createInstructors = (numInstructors) => {
    for (let id = 1; id <= numInstructors; id++) {
      // console.log('Instructors generating data for course ', id);
      let bool;
      const random = Math.random();
      let rating = random;
      while (!bool) {
        if (rating < 3.9) {
          rating++;
        } else {
          bool = true;
        }
      }

      const instructor = {
        _id: (id + (filenum - 1) * entries),
        firstName: faker.name.firstName(),
        middleInitial: faker.name.middleName().slice(0, 1).toUpperCase(),
        lastName: faker.name.lastName(),
        academicTitle: random < 0.2 ? 'Instructor'
          : random < 0.4 ? 'Associate Professor'
            : random < 0.85 ? 'Professor'
              : 'PhD',
        title: faker.name.title(),
        organization: schools[Math.floor(random * schools.length)],
        learners: Math.floor(random * 5000),
        courses: [],
        instructorAverageRating: Number.parseFloat(rating).toPrecision(2),
        numberOfRatings: Math.floor(rating * random * 2345),
      };
      instructors.push(instructor);
    }
  };

  // adds one primary instructor per course
  const addPrimaryInstructors = (numCourses) => {
    const courseInstructors = [];
    for (let i = 1; i <= numCourses; i++) {
      courseInstructors.push(Math.floor(Math.random() * numCourses * 0.4) + 1);
    }

    for (let i = 1; i < courseInstructors.length; i++) {
      const courseObj = {
        courseNumber: i,
        isPrimaryInstructor: true,
      };

      instructors[courseInstructors[i]].courses.push(courseObj);
    }
  };

  // assigns 0 to 3 assistant instructors per course, no min or max courses per assistant
  const addAssistantInstructors = (numCourses) => {
    for (let courseNumber = 1; courseNumber <= numCourses; courseNumber++) {
      const numberOfAssistants = Math.floor(Math.random() * 4);
      const assistants = [];

      while (assistants.length < numberOfAssistants) {
        const assistantIndex = Math.floor(Math.random() * numCourses * 0.6) + numCourses * 0.4;

        // prevents the same instructor from being added twice to the same course
        if (!assistants.includes(assistantIndex)) {
          assistants.push(assistantIndex);
        }
      }
      for (let i = 0; i < assistants.length; i++) {
        const assistantObject = {
          courseNumber,
          isPrimaryInstructor: false,
        };
        instructors[assistants[i]].courses.push(assistantObject);
      }
    }
  };

  createInstructors(entries);
  addPrimaryInstructors(entries);
  addAssistantInstructors(entries);
  fs.writeFileSync(`./db/seeders/instructors_${filenum}.json`, JSON.stringify(instructors, null, '\t'));
  return instructors;
};

let count = 1;
const start = new Date();
while (count <= 10) {
  generateInstructors(process.env.PRIMARY_RECORD_BATCH_SIZE, count);
  count++;
}
const end = new Date();
console.log('Time to complete: ', end - start, 'ms');

module.exports = generateInstructors;
