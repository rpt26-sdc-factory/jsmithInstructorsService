/* eslint-disable no-console */
/* eslint-disable no-plusplus */
/* eslint-disable no-underscore-dangle */
require('dotenv').config();
const supertest = require('supertest');
const { Pool } = require('pg');
const app = require('../server/api.js');
const { testInstructors, testOfferedBys, testTestimonials } = require('../__data__/test_data.js');

const request = supertest(app);
const pool = new Pool();
let client;
pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

beforeAll(async (done) => {
  client = await pool.connect();
  await client.query('TRUNCATE TABLE test.instructor_details RESTART IDENTITY CASCADE; TRUNCATE TABLE test.primary_instructors RESTART IDENTITY; TRUNCATE TABLE test.assistant_instructors RESTART IDENTITY; TRUNCATE TABLE test.offeredbys RESTART IDENTITY; TRUNCATE TABLE test.testimonials RESTART IDENTITY;');

  testInstructors.forEach(async (instructors) => {
    const options = [
      instructors.firstname,
      instructors.middleinitial,
      instructors.lastname,
      instructors.academic_title,
      instructors.title,
      instructors.organization,
      instructors.learners,
      instructors.instructor_avg_rating,
      instructors.num_ratings,
    ];
    const primaryInstructors = [];
    const assistInstructors = [];
    let param = 10;
    instructors.courses.forEach((course) => {
      if (course.isPrimaryInstructor) {
        options.push(course.courseNumber);
        primaryInstructors.push(`($${param}::int,(SELECT instructor_id FROM new_instructor))`);
        param++;
      } else {
        options.push(course.courseNumber);
        assistInstructors.push(`($${param}::int,(SELECT instructor_id FROM new_instructor))`);
        param++;
      }
    });
    const sql = {
      text: `WITH new_instructor AS (INSERT INTO test.instructor_details(firstname,middleinitial,lastname,academic_title,title,organization,learners,instructor_avg_rating,num_ratings) VALUES ($1::text, $2::text, $3::text, $4::text, $5::text, $6::text, $7::int, $8::text, $9::int) RETURNING instructor_id), new_primary_instructor AS (INSERT INTO test.primary_instructors(course_id,instructor_id) VALUES ${primaryInstructors.join(',')}) INSERT INTO test.assistant_instructors(course_id,instructor_id) VALUES ${assistInstructors.join(',')} RETURNING instructor_id`,
      values: options,
    };
    try {
      await client.query(sql);
    } catch (err) {
      console.error(err.message);
    }
  });

  testOfferedBys.forEach(async (offeredBy) => {
    const options = [
      offeredBy.offeredby_id,
      offeredBy.offeredby_name,
      offeredBy.offeredby_description,
    ];
    const sql = {
      text: 'INSERT INTO test.offeredbys (offeredby_id,offeredby_name,offeredby_description) VALUES ($1::int, $2::text, $3::text) RETURNING course_id',
      values: options,
    };
    try {
      await client.query(sql);
    } catch (err) {
      console.error(err.message);
    }
  });

  testTestimonials.forEach(async (data) => {
    const options = [
      data.course_id,
      data.username,
      data.testimonial,
    ];
    const sql = {
      text: 'INSERT INTO test.testimonials (course_id,username,testimonial) VALUES ($1::int, $2::text, $3::text)',
      values: options,
    };
    try {
      await client.query(sql);
    } catch (err) {
      console.error(err.message);
    }
  });
  done();
});

afterAll(async (done) => {
  await client.release();
  await client.end();
  done();
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
          courseNumber: 4,
          isPrimaryInstructor: true,
        },
        {
          courseNumber: 2,
          isPrimaryInstructor: false,
        },
      ],
      instructor_avg_rating: '4.1',
      num_ratings: 816,
    };

    const response = await request.post('/api/instructors').send(data);
    expect(response.status).toBe(200);
    expect(response.body[0].instructor_id).toBe(3);
    done();
  });

  test('should be able to get all instructors for a course', async (done) => {
    const response = await request.get('/api/instructors/3');
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(2);
    done();
  });

  test('should return status code 400 if the course does not exist or have instructors', async (done) => {
    const response = await request.get('/api/instructors/999');
    expect(response.status).toBe(400);
    done();
  });

  test('should be able to read 1 primary instructor from instructors', async (done) => {
    const response = await request.get('/api/primaryinstructor/2');
    expect(response.status).toBe(200);
    expect(response.body[0].firstname).toBe('Hosea');
    done();
  });

  test('should be able to update a document from instructors', async (done) => {
    const data = { firstname: 'EditedTester' };
    const response = await request.put('/api/instructors/3').send(data);
    expect(response.status).toBe(200);
    expect(response.body[0].firstname).toBe('EditedTester');
    const check = await request.get('/api/primaryinstructor/4').send(data);
    expect(check.body[0].firstname).toBe('EditedTester');
    done();
  });

  test('should return status code 400 if the instructor id does not exist', async (done) => {
    const data = { firstname: 'EditedTester' };
    const response = await request.put('/api/instructors/999').send(data);
    expect(response.status).toBe(400);
    done();
  });

  test('should be able to delete a document from instructors', async (done) => {
    const response = await request.del('/api/instructors/3');
    expect(response.status).toBe(200);
    const check = await request.get('/api/instructors/4');
    expect(check.status).toBe(400);
    done();
  });
});

describe('Test CRUD requests for offeredBys', () => {
  test('should create a new document in the offeredBys database', async (done) => {
    const data = {
      offeredby_id: 2,
      offeredby_name: 'University of Pennsylvania',
      offeredby_description: 'The University of Pennsylvania (commonly referred to as Penn) is a private university, located in Philadelphia, Pennsylvania, United States. A member of the Ivy League, Penn is the fourth-oldest institution of higher education in the United States, and considers itself to be the first university in the United States with both undergraduate and graduate studies.',
    };

    const response = await request.post('/api/offeredbys').send(data);
    expect(response.status).toBe(200);
    expect(response.body[0].course_id).toBe(3);
    done();
  });

  test('should be able to read 1 row from offeredBys', async (done) => {
    const response = await request.get('/api/offeredbys/3').send();
    expect(response.status).toBe(200);
    expect(response.body[0].offeredby_name).toBe('University of Pennsylvania');
    done();
  });

  test('should return status code 400 if the course number is invalid', async (done) => {
    const response = await request.put('/api/offeredbys/999').send();
    expect(response.status).toBe(400);
    done();
  });

  test('should be able to update a document from offeredBys', async (done) => {
    const data = { offeredby_name: 'University of TESTEDIT' };

    const response = await request.put('/api/offeredbys/3').send(data);
    expect(response.status).toBe(200);
    expect(response.body[0].offeredby_name).toBe('University of TESTEDIT');
    const check = await request.get('/api/offeredbys/3').send();
    expect(check.body[0].offeredby_name).toBe('University of TESTEDIT');
    done();
  });

  test('should return status code 400 if the course number does not exist', async (done) => {
    const data = { offeredby_name: 'EditedTester Offered Name' };
    const response = await request.put('/api/offeredbys/999').send(data);
    expect(response.status).toBe(400);
    done();
  });

  test('should be able to delete a document from offeredBys', async (done) => {
    const response = await request.del('/api/offeredbys/3').send();
    expect(response.status).toBe(200);
    const check = await request.get('/api/offeredbys/3').send();
    expect(check.status).toBe(400);
    done();
  });
});

describe('Test CRUD requests for testimonials', () => {
  test('should insert data into the testimonials database', async (done) => {
    const data = {
      course_id: 1,
      username: 'HELLO TEST',
      testimonial: 'Eius ut aut. Accusantium atque eveniet qui consequatur velit quasi magni. Quia iusto nostrum est nam at. Quasi accusamus quasi quo quas rerum.',
    };

    const response = await request.post('/api/testimonals').send(data);
    expect(response.status).toBe(200);
    expect(response.body[0].testimonial_id).toBe(4);
    done();
  });

  test('should be able to read testimonials for a course', async (done) => {
    const response = await request.get('/api/testimonials/1').send();
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(2);
    done();
  });

  test('should return status code 400 if the course does not have a testimonial', async (done) => {
    const response = await request.get('/api/testimonials/999').send();
    expect(response.status).toBe(400);
    done();
  });

  test('should be able to update a document from testimonials', async (done) => {
    const data = { username: 'TEST ZERO' };

    const response = await request.put('/api/testimonials/4').send(data);
    expect(response.status).toBe(200);
    expect(response.body[0].username).toBe('TEST ZERO');
    const check = await request.get('/api/testimonials/1').send();
    expect(check.body[1].username).toBe('TEST ZERO');
    done();
  });

  test('should return status code 400 if cannot update the document _id', async (done) => {
    const data = { username: 'EditedTester' };
    const response = await request.put('/api/testimonials/999').send(data);
    expect(response.status).toBe(400);
    done();
  });

  test('should be able to delete a document from testimonials', async (done) => {
    const response = await request.del('/api/testimonals/4').send();
    expect(response.status).toBe(200);
    const check = await request.get('/api/testimonials/4').send();
    expect(check.status).toBe(400);
    done();
  });
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
