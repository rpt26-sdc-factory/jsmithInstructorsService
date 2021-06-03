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
  course_id: 3453,
  username: 'Clese D.',
  testimonial: 'Eius ut aut. Accusantium atque eveniet qui consequatur velit quasi magni. Quia iusto nostrum est nam at. Quasi accusamus quasi quo quas rerum.',
};

export default () => {
  http.post('http://localhost:3003/api/testimonials', JSON.stringify(data), { headers: { 'Content-Type': 'application/json' } });
  sleep(1);
};
