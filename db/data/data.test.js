const instructorsData = require('./instructors.json');
const offeredBysData = require('./offeredBys.json');
const testimonialsData = require('./testimonials.json');

const instructorsModel = require('../models.js').InstructorsModel;
const offeredBysModel = require('../models.js').OfferedBysModel;
const testimonialsModel = require('../models.js').TestimonialsModel;

const db = require('../index.js');

//data needs to be generated prior to running test
describe('instructorsGenerator outputs data in the proper format', () => {
  test('instructorsData should be an object with the correct properties', () => {
    let academicTitle = instructorsData[0].academicTitle;
    let acceptableTitles = ['Instructor', 'Associate Professor', 'Professor', 'PhD'];

    expect(typeof instructorsData).toBe('object');
    expect(typeof instructorsData[0].id).toBe('number');
    expect(typeof instructorsData[0].firstName).toBe('string');
    expect(typeof instructorsData[0].middleInitial).toBe('string');
    expect(instructorsData[0].middleInitial.length).toBe(1);
    expect(acceptableTitles.indexOf(academicTitle)).toBeGreaterThan(-1);
    expect(typeof instructorsData[0].title).toBe('string');
    expect(typeof instructorsData[0].organization).toBe('string');
    expect(typeof instructorsData[0].learners).toBe('number');
    expect(Array.isArray(instructorsData[0].courses)).toBe(true);
    expect(typeof instructorsData[0].instructorAverageRating).toBe('string');
    expect(typeof instructorsData[0].numberOfRatings).toBe('number');
    expect(instructorsData.length).toBe(100);
  });
});

describe('offeredBysGenerator outputs data in the proper format', () => {
  test('offeredBysData should be an object with the correct properties', () => {
    let offeredByNames = ['DeepLearning.AI', 'Erasmus University Rotterdam', 'IBM', 'University of Illinois at Urbana-Champaign', 'University of Pennsylvania', 'University of Virginia'];
    expect(typeof offeredBysData).toBe('object');
    expect(typeof offeredBysData[0]).toBe('object');
    expect(typeof offeredBysData[0].id).toBe('number');
    expect(typeof offeredBysData[0].offeredByIndex).toBe('number');
    expect(typeof offeredBysData[0].offeredByName).toBe('string');
    expect(offeredByNames.indexOf(offeredBysData[0].offeredByName)).toBeGreaterThan(-1);
    expect(typeof offeredBysData[0].offeredByDescription).toBe('string');
    expect(offeredBysData.length).toBe(100);
  });
});

describe('testimonialsGenerator outputs data in the proper format', () => {
  test('testimonialsData should be an object with the correct properties', () => {
    expect(typeof testimonialsData).toBe('object');
    expect(typeof testimonialsData[0]).toBe('object');
    expect(typeof testimonialsData[0].id).toBe('number');
    expect(typeof testimonialsData[0].name).toBe('string');
    expect(typeof testimonialsData[0].testimonialText).toBe('string');
    expect(testimonialsData.length).toBe(9);
  });
});

describe('instructors database has been seeded', () => {
  test('instructors table should have instructors data', () => {
    let jsonData;
    for (let i = 0; i < instructorsData.length; i++) {
      //
      if (instructorsData[i].courses && instructorsData[i].courses[0] && instructorsData[i].courses[0].courseNumber === 1) {
        jsonData = instructorsData[i];
        break;
      }
    }
    db.findInstructors(1, (data) => {
      expect(data.id).toEqual(jsonData.id);
    });
  });
});