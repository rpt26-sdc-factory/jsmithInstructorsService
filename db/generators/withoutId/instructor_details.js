/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
/* eslint-disable no-plusplus */
/* eslint-disable no-nested-ternary */
require('dotenv').config();
const faker = require('faker');
const fs = require('fs');

const batchSize = process.env.NODE_ENV === 'test' ? 100 : process.env.PRIMARY_RECORD_BATCH_SIZE;
const numBatches = process.env.NODE_ENV === 'test' ? 1 : process.env.PRIMARY_RECORD_BATCH_NUM;
const generateInstructors = (totalInstructors) => {
  const instructors = [];

  const schools = [
    'Alfred University',
    'Baylor University',
    'Centenary University',
    'Dallas Christian College',
    'East Carolina University',
    'Farmingdale State College',
    'Lewis University',
    'Marian University',
    'Ohio State University',
    'Zaytuna College',
  ]; // Pulled manually from https://nces.ed.gov/collegenavigator

  // creates n instructors
  for (let id = 1; id <= totalInstructors; id++) {
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

    const instructor = `${faker.name.firstName()},${faker.name.middleName().slice(0, 1).toUpperCase()},${faker.name.lastName()},${random < 0.2 ? 'Instructor' : random < 0.4 ? 'Associate Professor' : random < 0.85 ? 'Professor' : 'PhD'},${faker.name.title()},${schools[Math.floor(random * schools.length)]},${Math.floor(random * 5000)},${Number.parseFloat(rating).toPrecision(2)},${Math.floor(rating * random * 2345)}`;
    instructors.push(instructor);
  }

  const stream = fs.createWriteStream('./db/seeders/instructors_details.csv', { flags: 'a' });
  for (let rows = 0; rows < instructors.length; rows += 100000) {
    const string = rows === 0 ? `\n${instructors.splice(0, 100000).join('\n')}` : instructors.splice(0, 100000).join('\n');
    stream.write(string);
  }
};

const stream = fs.createWriteStream('./db/seeders/instructors_details.csv', { flags: 'w' });
stream.write('firstname,middleinitial,lastname,academic_title,title,organization,learners,instructor_avg_rating,num_ratings');
let count = 1;
const start = new Date();
while (count <= numBatches) {
  generateInstructors(batchSize);
  count++;
}
const end = new Date();
console.log('Time to complete: ', end - start, 'ms');

module.exports = generateInstructors;
