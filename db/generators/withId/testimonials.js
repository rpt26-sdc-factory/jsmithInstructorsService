/* eslint-disable max-len */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-plusplus */
/* eslint-disable no-console */
require('dotenv').config();
const faker = require('faker');
const fs = require('fs');

const batchSize = process.env.NODE_ENV === 'test' ? 100 : process.env.PRIMARY_RECORD_BATCH_SIZE;
const numBatches = process.env.NODE_ENV === 'test' ? 1 : process.env.PRIMARY_RECORD_BATCH_NUM;

const generateTestimonials = (courses, batchNum) => {
  const testimonials = [];

  let id = 1 + (batchNum - 1) * courses * 3;
  for (let courseNum = 1; courseNum <= courses; courseNum++) {
    const testimonial = [];
    testimonial.push(`${id},${courseNum + (batchNum - 1) * courses},${faker.name.firstName().concat(' ', faker.name.lastName().slice(0, 1), '.')},${faker.lorem.sentence()}`);
    id++;
    testimonial.push(`${id},${courseNum + (batchNum - 1) * courses},${faker.name.firstName().concat(' ', faker.name.lastName().slice(0, 1), '.')},${faker.lorem.sentence()}`);
    id++;
    testimonial.push(`${id},${courseNum + (batchNum - 1) * courses},${faker.name.firstName().concat(' ', faker.name.lastName().slice(0, 1), '.')},${faker.lorem.sentence()}`);
    testimonials.push(`\n${testimonial.join('\n')}`);
  }

  const stream = fs.createWriteStream('./db/seeders/id_testimonials.csv', { flags: 'a' });
  for (let rows = 0; rows < courses; rows += 1000) {
    const string = testimonials.splice(0, 1000).join('');
    stream.write(string);
  }
  return testimonials;
};

const stream = fs.createWriteStream('./db/seeders/id_testimonials.csv', { flags: 'w' });
stream.write('testimonial_id,course_id,username,testimonial');
let count = 1;
console.time('Generate testimonials');
while (count <= numBatches) {
  generateTestimonials(batchSize, count);
  count++;
}
console.timeEnd('Generate testimonials');

module.exports = generateTestimonials;
