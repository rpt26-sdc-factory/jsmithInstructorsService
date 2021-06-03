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
  offeredby_id: 1,
  offeredby_name: 'University of Pennsylvania',
  offeredby_description: 'The University of Pennsylvania (commonly referred to as Penn) is a private university, located in Philadelphia, Pennsylvania, United States.',
};

export default () => {
  http.post('http://localhost:3003/api/offeredbys', JSON.stringify(data), { headers: { 'Content-Type': 'application/json' } });
  sleep(1);
};
