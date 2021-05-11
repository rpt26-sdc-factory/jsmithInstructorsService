/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-plusplus */
/* eslint-disable no-console */
require('dotenv').config();
const faker = require('faker');
const fs = require('fs');

const generateTestimonials = (courses, filenum, id) => {
  const testimonials = [];
  let reviewId = id;

  for (let courseNum = 1; courseNum <= courses; courseNum++) {
    const random = Math.floor(Math.random() * 5);
    for (let reviews = 0; reviews <= random; reviews++) {
      const testimonial = {
        _id: reviewId,
        courseNumber: courseNum,
        name: faker.name.firstName().concat(' ', faker.name.lastName().slice(0, 1), '.'),
        testimonialText: faker.lorem.paragraph(),
      };
      reviewId++;
      testimonials.push(testimonial);
    }
  }

  fs.writeFileSync(`./db/seeders/testimonials_${filenum}.json`, JSON.stringify(testimonials, null, '\t'));
  return testimonials.length + id - 1;
};

let count = 1;
let startId = 1;
const start = new Date();
while (count <= 20) {
  startId = generateTestimonials(process.env.PRIMARY_RECORD_BATCH_SIZE / 2, count, startId) + 1;
  count++;
}
const end = new Date();
console.log('Time to complete: ', end - start, 'ms');

module.exports = generateTestimonials;
