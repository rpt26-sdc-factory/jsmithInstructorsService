/* eslint-disable no-await-in-loop */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
/* eslint-disable no-plusplus */
/* eslint-disable no-nested-ternary */
require('dotenv').config();
const faker = require('faker');
const client = require('../postgres/database.js');

const batchSize = process.env.NODE_ENV === 'test' ? 100 : process.env.PRIMARY_RECORD_BATCH_SIZE;
let numBatches = process.env.NODE_ENV === 'test' ? 1 : process.env.PRIMARY_RECORD_BATCH_NUM;

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
  for (let id = 0; id < totalInstructors; id++) {
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
      firstname: faker.name.firstName(),
      middleinitial: faker.name.middleName().slice(0, 1).toUpperCase(),
      lastname: faker.name.lastName(),
      academic_title: random < 0.2 ? 'Instructor' : random < 0.4 ? 'Associate Professor' : random < 0.85 ? 'Professor' : 'PhD',
      title: faker.name.title(),
      organization: schools[Math.floor(random * schools.length)],
      learners: Math.floor(random * 5000),
      instructor_avg_rating: Number.parseFloat(rating).toPrecision(2),
      num_ratings: Math.floor(rating * random * 2345),
    };
    instructors.push(instructor);
  }

  return instructors;
};

(async () => {
  console.time('Insert 10 million instructors');
  while (numBatches > 0) {
    const pool = await client.connect();
    try {
      const option = [JSON.stringify(generateInstructors(batchSize))];
      const sql = 'INSERT INTO coursera.instructor_details (firstname,middleinitial,lastname,academic_title,title,organization,learners,instructor_avg_rating,num_ratings) SELECT firstname,middleinitial,lastname,academic_title,title,organization,learners,instructor_avg_rating,num_ratings FROM json_populate_recordset(NULL::coursera.instructor_details, $1)';
      await pool.query(sql, option);
    } catch (err) {
      console.error(err);
    } finally {
      pool.release();
    }
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    process.stdout.write(`--- Inserted ${batchSize * (process.env.PRIMARY_RECORD_BATCH_NUM - numBatches)} ---\r`);
    numBatches--;
  }
  console.timeEnd('Insert 10 million instructors');
})();
