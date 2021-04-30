/* eslint-disable no-console */
/* eslint-disable radix */
const app = require('./api.js');

const port = 3003;

app.listen(port, () => {
  console.log(`Instructors service listening at http://localhost:${port}`);
});
