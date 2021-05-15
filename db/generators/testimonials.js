/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-plusplus */
/* eslint-disable no-console */
require('dotenv').config();
const faker = require('faker');
const fs = require('fs');

const batchSize = process.env.NODE_ENV === 'test' ? 100 : process.env.PRIMARY_RECORD_BATCH_SIZE;
const numBatches = process.env.NODE_ENV === 'test' ? 1 : process.env.PRIMARY_RECORD_BATCH_NUM;

const generateTestimonials = (courses) => {
  const testimonials = [];

  for (let courseNum = 1; courseNum <= courses; courseNum++) {
    const random = Math.floor(Math.random() * 5);
    let testimonial = '';
    for (let reviews = 0; reviews <= random; reviews++) {
      testimonial += `${courseNum},${faker.name.firstName().concat(' ', faker.name.lastName().slice(0, 1), '.')},${faker.lorem.paragraph()}`;
    }
    testimonials.push(testimonial);
  }

  const stream = fs.createWriteStream('./db/seeders/testimonials.csv', { flags: 'a' });
  for (let rows = 0; rows < courses; rows += 100000) {
    const string = rows === 0 ? `\n${testimonials.splice(0, 100000).join('\n')}` : testimonials.splice(0, 100000).join('\n');
    stream.write(string);
  }
  return testimonials;
};

const stream = fs.createWriteStream('./db/seeders/testimonials.csv', { flags: 'w' });
stream.write('course_id,username,testimonial\n');
let count = 1;
const start = new Date();
while (count <= numBatches) {
  generateTestimonials(batchSize);
  count++;
}
const end = new Date();
console.log('Time to complete: ', end - start, 'ms');

module.exports = generateTestimonials;
