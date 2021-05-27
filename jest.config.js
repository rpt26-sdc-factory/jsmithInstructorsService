/* eslint-disable linebreak-style */
module.exports = {
  testEnvironment: 'node',
  modulePathIgnorePatterns: [
    '/db/data/data.test.js',
    './__tests__/cassandra_benchmark.js',
    './__tests__/postgres_benchmark.js',
  ],
  coveragePathIgnorePatterns: ['/node_modules/'],
  collectCoverageFrom: [
    '**/server/*.{js,jsx}',
    '**/server/controllers/*.js',
    '!**/node_modules/**',
    '!**/server/index.js',
    '!**/db/database.js',
  ],
};
