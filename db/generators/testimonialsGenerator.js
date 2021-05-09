/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-plusplus */
/* eslint-disable no-console */
require('dotenv').config();
const faker = require('faker');
const fs = require('fs');

const generateTestimonials = (courses, filenum) => {
  const testimonials = [];

  for (let id = 1; id <= courses; id++) {
    const random = Math.floor(Math.random() * 5);
    for (let reviews = 0; reviews <= random; reviews++) {
      const testimonial = {
        courseNumber: id,
        name: faker.name.firstName().concat(' ', faker.name.lastName().slice(0, 1), '.'),
        testimonialText: faker.lorem.paragraph(),
      };
      testimonials.push(testimonial);
    }
  }

  fs.writeFileSync(`./db/seeders/testimonials_${filenum}.json`, JSON.stringify(testimonials, null, '\t'));
  return testimonials;
};

let count = 20;
const start = new Date();
while (count > 0) {
  generateTestimonials(process.env.PRIMARY_RECORD_BATCH_SIZE / 2, count);
  count--;
}
const end = new Date();
console.log('Time to complete: ', end - start, 'ms');

module.exports = generateTestimonials;
