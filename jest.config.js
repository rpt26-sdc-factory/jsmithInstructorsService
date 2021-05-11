/* eslint-disable linebreak-style */
module.exports = {
  testEnvironment: 'node',
  modulePathIgnorePatterns: ['/db/data/data.test.js'],
  coveragePathIgnorePatterns: ['/node_modules/'],
  collectCoverageFrom: [
    '**/server/*.{js,jsx}',
    '**/db/*.{js,jsx}',
    '!**/node_modules/**',
    '!**/server/index.js',
    '!**/db/database.js',
  ],
};
