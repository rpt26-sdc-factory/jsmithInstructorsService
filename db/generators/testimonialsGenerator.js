/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-plusplus */
/* eslint-disable no-console */
const faker = require('faker');
// const fs = require('fs');

// creates 9 testimonials
const generateTestimonials = (courses) => {
  const testimonials = [];

  for (let id = 1; id <= courses; id++) {
    const testimonial = [
      {
        courseNumber: id,
        name: faker.name.firstName().concat(' ', faker.name.lastName().slice(0, 1), '.'),
        testimonialText: faker.lorem.paragraph(),
      },
      {
        courseNumber: id,
        name: faker.name.firstName().concat(' ', faker.name.lastName().slice(0, 1), '.'),
        testimonialText: faker.lorem.paragraph(),
      },
      {
        courseNumber: id,
        name: faker.name.firstName().concat(' ', faker.name.lastName().slice(0, 1), '.'),
        testimonialText: faker.lorem.paragraph(),
      },
    ];
    testimonials.push(...testimonial);
  }

  // fs.writeFileSync('./db/data/testimonials.json', JSON.stringify(testimonials, null, '\t'));
  return testimonials;
};

module.exports = generateTestimonials;
