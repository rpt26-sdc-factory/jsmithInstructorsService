/* eslint-disable no-underscore-dangle */
require('dotenv').config();
require('../db/generators/instructorsGenerator.js');
require('../db/generators/offeredBysGenerator.js');
require('../db/generators/testimonialsGenerator.js');
const supertest = require('supertest');
const mongoose = require('mongoose');
const app = require('../server/api.js');
const { InstructorsModel, OfferedBysModel, TestimonialsModel } = require('../db/models.js');
const { instructorsInsert, offeredBysInsert, testimonialsInsert } = require('../db/methods.js');
const instructorsData = require('../db/seeders/instructors_1.json');
const offeredBysData = require('../db/seeders/offeredbys_1.json');
const testimonialsData = require('../db/seeders/testimonials_1.json');

const request = supertest(app);

beforeAll(async (done) => {
  mongoose.connect(`mongodb://${process.env.DB_HOSTNAME}:${process.env.DB_PORT}/test`, { useNewUrlParser: true, useUnifiedTopology: true });

  await InstructorsModel.deleteMany({});
  await OfferedBysModel.deleteMany({});
  await TestimonialsModel.deleteMany({});
  await instructorsInsert(instructorsData);
  await offeredBysInsert(offeredBysData);
  await testimonialsInsert(testimonialsData);
  done();
});

afterAll(async (done) => {
  await mongoose.connection.close();
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
    const data = [{
      firstName: 'Tester',
      middleInitial: 'C',
      lastName: 'Guy',
      academicTitle: 'Cool Instructor',
      title: 'Global Creative Producer',
      organization: 'Centenary University',
      learners: 426,
      courses: [],
      instructorAverageRating: '4.1',
      numberOfRatings: 816,
    }];

    const response = await request.post('/api/instructors').send(data);
    expect(response.status).toBe(200);
    expect(response.body[0]._id).toBe(101);
    expect(response.body[0].firstName).toBe('Tester');
    done();
  });

  test('should create new documents in the instructors database', async (done) => {
    const data = [{
      firstName: 'Another',
      middleInitial: 'C',
      lastName: 'Test',
      academicTitle: 'Instructor',
      title: 'Global Creative Producer',
      organization: 'Centenary University',
      learners: 426,
      courses: [
        {
          courseNumber: 101,
          isPrimaryInstructor: true,
        },
      ],
      instructorAverageRating: '4.1',
      numberOfRatings: 816,
    },
    {
      firstName: 'Third',
      middleInitial: 'O',
      lastName: 'Test',
      academicTitle: 'Professor',
      title: 'Central Division Manager',
      organization: 'Ohio State University',
      learners: 2790,
      courses: [],
      instructorAverageRating: '4.6',
      numberOfRatings: 5965,
    }];

    const response = await request.post('/api/instructors').send(data);
    expect(response.status).toBe(200);
    expect(response.body[0]._id).toBe(102);
    expect(response.body[1]._id).toBe(103);
    expect(response.body[0].firstName).toBe('Another');
    expect(response.body[1].firstName).toBe('Third');
    done();
  });

  test('should be able to read 1 document from instructors', async (done) => {
    const response = await request.get('/api/instructors/101').send();
    expect(response.status).toBe(200);
    expect(response.body[0].firstName).toBe('Tester');
    done();
  });

  test('should return status code 400 if cannot get the document _id', async (done) => {
    const response = await request.get('/api/instructors/999').send();
    expect(response.status).toBe(400);
    done();
  });

  test('should be able read multiple documents from instructors', async (done) => {
    const response = await request.get('/api/instructors/101,102,103').send();
    expect(response.status).toBe(200);
    expect(response.body[0].firstName).toBe('Tester');
    expect(response.body[1].firstName).toBe('Another');
    expect(response.body[2].firstName).toBe('Third');
    done();
  });

  test('should be able to read all documents from instructors', async (done) => {
    const response = await request.get('/api/allinstructors').send();
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(103);
    done();
  });

  test('should be able to read 1 primary instructor from instructors', async (done) => {
    const response = await request.get('/api/primaryinstructor/101').send();
    expect(response.status).toBe(200);
    expect(response.body.firstName).toBe('Another');
    done();
  });

  test('should be able to update a document from instructors', async (done) => {
    const data = { firstName: 'EditedTester' };

    const response = await request.put('/api/instructors/101').send(data);
    expect(response.status).toBe(200);
    expect(response.body.firstName).toBe('EditedTester');
    const check = await request.get('/api/instructors/101').send();
    expect(check.body[0].firstName).toBe('EditedTester');
    done();
  });

  test('should return status code 400 if cannot update the document _id', async (done) => {
    const data = { firstName: 'EditedTester' };
    const response = await request.put('/api/instructors/999').send(data);
    expect(response.status).toBe(400);
    done();
  });

  test('should be able to delete a document from instructors', async (done) => {
    const response = await request.del('/api/instructors/103').send();
    expect(response.status).toBe(200);
    const check = await request.get('/api/allinstructors').send();
    expect(check.body.length).toBe(102);
    done();
  });
});

describe('Test CRUD requests for offeredBys', () => {
  test('should create a new document in the offeredBys database', async (done) => {
    const data = [{
      offeredByIndex: 999,
      offeredByName: 'University of Pennsylvania',
      offeredByDescription: 'The University of Pennsylvania (commonly referred to as Penn) is a private university, located in Philadelphia, Pennsylvania, United States. A member of the Ivy League, Penn is the fourth-oldest institution of higher education in the United States, and considers itself to be the first university in the United States with both undergraduate and graduate studies.',
    }];

    const response = await request.post('/api/offeredbys').send(data);
    expect(response.status).toBe(200);
    expect(response.body[0]._id).toBe(101);
    expect(response.body[0].offeredByIndex).toBe(999);
    done();
  });

  test('should create new documents in the offeredBys database', async (done) => {
    const data = [{
      offeredByIndex: 996,
      offeredByName: 'University of Pennsylvania',
      offeredByDescription: 'The University of Pennsylvania (commonly referred to as Penn) is a private university, located in Philadelphia, Pennsylvania, United States. A member of the Ivy League, Penn is the fourth-oldest institution of higher education in the United States, and considers itself to be the first university in the United States with both undergraduate and graduate studies.',
    },
    {
      offeredByIndex: 995,
      offeredByName: 'University of Virginia',
      offeredByDescription: 'A premier institution of higher education, The University of Virginia offers outstanding academics, world-class faculty, and an inspiring, supportive environment. Founded by Thomas Jefferson in 1819, the University is guided by his vision of discovery, innovation, and development of the full potential of students from all walks of life. Through these courses, global learners have an opportunity to study with renowned scholars and thought leaders.',
    }];

    const response = await request.post('/api/offeredbys').send(data);
    expect(response.status).toBe(200);
    expect(response.body[0]._id).toBe(102);
    expect(response.body[1]._id).toBe(103);
    expect(response.body[0].offeredByIndex).toBe(996);
    expect(response.body[1].offeredByIndex).toBe(995);
    done();
  });

  test('should be able to read 1 document from offeredBys', async (done) => {
    const response = await request.get('/api/offeredbys/101').send();
    expect(response.status).toBe(200);
    expect(response.body[0].offeredByIndex).toBe(999);
    done();
  });

  test('should be able read multiple documents from offeredBys', async (done) => {
    const response = await request.get('/api/offeredbys/101,102,103').send();
    expect(response.status).toBe(200);
    expect(response.body[0].offeredByIndex).toBe(999);
    expect(response.body[1].offeredByIndex).toBe(996);
    expect(response.body[2].offeredByIndex).toBe(995);
    done();
  });

  test('should be able to read all documents from offeredBys', async (done) => {
    const response = await request.get('/api/offeredbyall').send();
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(103);
    done();
  });

  test('should return status code 400 if cannot get the document _id', async (done) => {
    const response = await request.put('/api/offeredbys/999').send();
    expect(response.status).toBe(400);
    done();
  });

  test('should be able to update a document from offeredBys', async (done) => {
    const data = { offeredByName: 'University of TESTEDIT' };

    const response = await request.put('/api/offeredbys/101').send(data);
    expect(response.status).toBe(200);
    expect(response.body.offeredByName).toBe('University of TESTEDIT');
    const check = await request.get('/api/offeredbys/101').send();
    expect(check.body[0].offeredByName).toBe('University of TESTEDIT');
    done();
  });

  test('should return status code 400 if cannot update the document _id', async (done) => {
    const data = { offeredByName: 'EditedTester Offered Name' };
    const response = await request.put('/api/offeredbys/999').send(data);
    expect(response.status).toBe(400);
    done();
  });

  test('should be able to delete a document from offeredBys', async (done) => {
    const response = await request.del('/api/offeredbys/103').send();
    expect(response.status).toBe(200);
    const check = await request.get('/api/offeredbyall').send();
    expect(check.body.length).toBe(102);
    done();
  });
});

describe('Test CRUD requests for testimonials', () => {
  test('should insert data into the testimonials database', async (done) => {
    const data = [{
      courseNumber: 101,
      name: 'HELLO TEST',
      testimonialText: 'Eius ut aut. Accusantium atque eveniet qui consequatur velit quasi magni. Quia iusto nostrum est nam at. Quasi accusamus quasi quo quas rerum.',
    }];

    const response = await request.post('/api/testimonals').send(data);
    expect(response.status).toBe(200);
    expect(response.body[0].name).toBe('HELLO TEST');
    done();
  });

  test('should create new documents in the testimonials database', async (done) => {
    const data = [{
      courseNumber: 101,
      name: 'TEST 2',
      testimonialText: 'Quod ipsum nihil laboriosam. Illo et non. In molestias aperiam facilis. Dolores a illum illum nam iure. Eum voluptate adipisci eos impedit. Eveniet quia est dolorum.',
    },
    {
      courseNumber: 101,
      name: 'TEST 3',
      testimonialText: 'Quia quo quas fugit nobis incidunt ipsa. Consequatur et error excepturi sunt impedit. Ipsum fuga vel numquam occaecati necessitatibus sed cum.',
    }];

    const response = await request.post('/api/testimonals').send(data);
    expect(response.status).toBe(200);
    expect(response.body[0].name).toBe('TEST 2');
    expect(response.body[1].name).toBe('TEST 3');
    done();
  });

  test('should be able to read 1 document from testimonials', async (done) => {
    const response = await request.get('/api/testimonials/1').send();
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
    done();
  });

  test('should be able read multiple documents from testimonials', async (done) => {
    const response = await request.get('/api/testimonials/1,2,3').send();
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(3);
    done();
  });

  test('should return status code 400 if cannot get the document _id', async (done) => {
    const response = await request.put('/api/testimonials/9999').send();
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
    const response = await request.put('/api/testimonials/9999').send(data);
    expect(response.status).toBe(400);
    done();
  });

  test('should be able to delete a document from testimonials', async (done) => {
    const initDocs = await TestimonialsModel.countDocuments({});
    const response = await request.del('/api/testimonals/1').send();
    expect(response.status).toBe(200);
    const check = await TestimonialsModel.countDocuments({});
    expect(initDocs - check).toBe(1);
    done();
  });
});
