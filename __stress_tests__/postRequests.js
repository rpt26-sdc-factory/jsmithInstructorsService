/* eslint-disable no-undef */
/* eslint-disable import/no-unresolved */
import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  scenarios: {
    open_model: {
      executor: 'constant-arrival-rate',
      rate: __ENV.RPS,
      timeUnit: '1s',
      duration: '1m',
      preAllocatedVUs: 100,
      maxVUs: 20000,
    },
  },
};

const data = {
  firstname: 'Frank',
  middleinitial: 'C',
  lastname: 'Armstrong',
  academic_title: 'Instructor',
  title: 'Global Creative Producer',
  organization: 'Centenary University',
  learners: 426,
  courses: [
    {
      courseNumber: 8999999,
      isPrimaryInstructor: false,
    },
    {
      courseNumber: 9999993,
      isPrimaryInstructor: false,
    },
  ],
  instructor_avg_rating: '4.1',
  num_ratings: 5,
};

export default () => {
  http.post('http://localhost:3003/api/instructors', JSON.stringify(data), { headers: { 'Content-Type': 'application/json' } });
  sleep(1);
};
