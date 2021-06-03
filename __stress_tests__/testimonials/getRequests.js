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

export default () => {
  http.get('http://localhost:3003/api/testimonials/24000000');
  sleep(1);
};
