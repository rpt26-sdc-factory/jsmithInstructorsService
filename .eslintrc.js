/**
 * These rules enforce the Hack Reactor Style Guide
 *
 * Visit this repo for more information:
 *   https://github.com/reactorcore/eslint-config-hackreactor
 */

module.exports = {
  extends: 'airbnb',
  plugins: ['jest'],
  env: {
    'jest/globals': true,
  },
  parser: '@babel/eslint-parser',
};
