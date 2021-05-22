/* eslint-disable no-underscore-dangle */
require('dotenv').config();
const supertest = require('supertest');
const { Client } = require('pg');
const app = require('../server/api.js');

const client = new Client();
const request = supertest(app);

beforeAll(async (done) => {
  await client.connect();
  await client.query('TRUNCATE TABLE test.instructor_details; TRUNCATE TABLE test.assistant_instructors; TRUNCATE TABLE test.primary_instructors; TRUNCATE TABLE test.offeredbys; TRUNCATE TABLE test.testimonials;');
  done();
});

afterAll(async (done) => {
  await client.end();
  done();
});

describe('General', () => {
  test('Default page should load', async (done) => {
    const response = await request.get('/').send();
    expect(response.status).toBe(200);
    done();
  });

  test('Default page should load with a course number', async (done) => {
    const response = await request.get('/1').send();
    expect(response.status).toBe(200);
    done();
  });
});

describe('Test CRUD requests for instructors', () => {
  test('should create one new document in the instructors database', async (done) => {
    const data = {
      firstname: 'Tester',
      middleinitial: 'C',
      lastname: 'Guy',
      academic_title: 'Cool Instructor',
      title: 'Global Creative Producer',
      organization: 'Centenary University',
      learners: 426,
      courses: [
        {
          courseNumber: 13,
          isPrimaryInstructor: true,
        },
        {
          courseNumber: 13,
          isPrimaryInstructor: false,
        },
      ],
      instructor_avg_rating: '4.1',
      num_ratings: 816,
    };

    const response = await request.post('/api/instructors').send(data);
    expect(response.status).toBe(200);
    expect(response.body[0].instructor_id).toBe(1);
    done();
  });

  test('should be able to get all instructors for a course', async (done) => {
    const response = await request.get('/api/instructors/13').send();
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(2);
    done();
  });

  test('should return status code 400 if the course does not exist or have instructors', async (done) => {
    const response = await request.get('/api/instructors/999').send();
    expect(response.status).toBe(400);
    done();
  });

  test('should be able to read 1 primary instructor from instructors', async (done) => {
    const response = await request.get('/api/primaryinstructor/13').send();
    expect(response.status).toBe(200);
    expect(response.body.firstName).toBe('Tester');
    done();
  });

  test('should be able to update a document from instructors', async (done) => {
    const data = { firstname: 'EditedTester' };

    const response = await request.put('/api/instructors/1').send(data);
    expect(response.status).toBe(200);
    expect(response.body.firstname).toBe('EditedTester');
    const check = await request.get('/api/instructors/1').send();
    expect(check.body[0].firstName).toBe('EditedTester');
    done();
  });

  test('should return status code 400 if the instructor id does not exist', async (done) => {
    const data = { firstName: 'EditedTester' };
    const response = await request.put('/api/instructors/999').send(data);
    expect(response.status).toBe(400);
    done();
  });

  test('should be able to delete a document from instructors', async (done) => {
    const response = await request.del('/api/instructors/1').send();
    expect(response.status).toBe(200);
    const check = await request.get('/api/instructors/1').send();
    expect(check.status).toBe(400);
    done();
  });
});

describe('Test CRUD requests for offeredBys', () => {
  test('should create a new document in the offeredBys database', async (done) => {
    const data = {
      offeredby_id: 1,
      offeredby_name: 'University of Pennsylvania',
      offeredby_description: 'The University of Pennsylvania (commonly referred to as Penn) is a private university, located in Philadelphia, Pennsylvania, United States. A member of the Ivy League, Penn is the fourth-oldest institution of higher education in the United States, and considers itself to be the first university in the United States with both undergraduate and graduate studies.',
    };

    const response = await request.post('/api/offeredbys').send(data);
    expect(response.status).toBe(200);
    expect(response.body[0].course_id).toBe(1);
    expect(response.body[0].offeredByIndex).toBe(1);
    done();
  });

  test('should be able to read 1 document from offeredBys', async (done) => {
    const response = await request.get('/api/offeredbys/1').send();
    expect(response.status).toBe(200);
    expect(response.body[0].offeredby_name).toBe('University of Pennsylvania');
    done();
  });

  test('should return status code 400 if the course number is invalide', async (done) => {
    const response = await request.put('/api/offeredbys/999').send();
    expect(response.status).toBe(400);
    done();
  });

  test('should be able to update a document from offeredBys', async (done) => {
    const data = { offeredby_name: 'University of TESTEDIT' };

    const response = await request.put('/api/offeredbys/1').send(data);
    expect(response.status).toBe(200);
    expect(response.body.offeredby_name).toBe('University of TESTEDIT');
    const check = await request.get('/api/offeredbys/101').send();
    expect(check.body[0].offeredby_name).toBe('University of TESTEDIT');
    done();
  });

  test('should return status code 400 if the course number does not exist', async (done) => {
    const data = { offeredByName: 'EditedTester Offered Name' };
    const response = await request.put('/api/offeredbys/999').send(data);
    expect(response.status).toBe(400);
    done();
  });

  test('should be able to delete a document from offeredBys', async (done) => {
    const response = await request.del('/api/offeredbys/1').send();
    expect(response.status).toBe(200);
    const check = await request.get('/api/offeredbys/1').send();
    expect(check.status).toBe(400);
    done();
  });
});

describe('Test CRUD requests for testimonials', () => {
  test('should insert data into the testimonials database', async (done) => {
    const data = {
      course_id: 13,
      username: 'HELLO TEST',
      testimonial: 'Eius ut aut. Accusantium atque eveniet qui consequatur velit quasi magni. Quia iusto nostrum est nam at. Quasi accusamus quasi quo quas rerum.',
    };

    const response = await request.post('/api/testimonals').send(data);
    expect(response.status).toBe(200);
    expect(response.body[0].testimonial_id).toBe(1);
    done();
  });

  test('should be able to read testimonials for a course', async (done) => {
    const response = await request.get('/api/testimonials/13').send();
    expect(response.status).toBe(200);
    expect(response.body[0].username).toBe('HELLO TEST');
    done();
  });

  test('should return status code 400 if the course does not have a testimonial', async (done) => {
    const response = await request.put('/api/testimonials/999').send();
    expect(response.status).toBe(400);
    done();
  });

  test('should be able to update a document from testimonials', async (done) => {
    const data = { name: 'TEST ZERO' };

    const response = await request.put('/api/testimonials/1').send(data);
    expect(response.status).toBe(200);
    expect(response.body.name).toBe('TEST ZERO');
    const check = await request.get('/api/testimonials/1').send();
    expect(check.body[0].name).toBe('TEST ZERO');
    done();
  });

  test('should return status code 400 if cannot update the document _id', async (done) => {
    const data = { name: 'EditedTester' };
    const response = await request.put('/api/testimonials/999').send(data);
    expect(response.status).toBe(400);
    done();
  });

  test('should be able to delete a document from testimonials', async (done) => {
    const response = await request.del('/api/testimonals/1').send();
    expect(response.status).toBe(200);
    const check = await request.get('/api/testimonials/1').send();
    expect(check.status).toBe(400);
    done();
  });
});
