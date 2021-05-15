/* eslint-disable no-console */
/* eslint-disable no-plusplus */
require('dotenv').config();
const fs = require('fs');

const batchSize = process.env.NODE_ENV === 'test' ? 100 : process.env.PRIMARY_RECORD_BATCH_SIZE;
const numBatches = process.env.NODE_ENV === 'test' ? 1 : process.env.PRIMARY_RECORD_BATCH_NUM;

// assigns one of six sponsors to each course
const generateOfferedBys = (courses, count) => {
  const offeredBys = [];
  const offeredByNames = [
    'DeepLearning.AI',
    'Erasmus University Rotterdam',
    'IBM',
    'University of Illinois at Urbana-Champaign',
    'University of Pennsylvania',
    'University of Virginia',
  ];
  const offeredBysDescription = [
    'DeepLearning.AI is an education technology company that develops a global community of AI talent.',
    'Erasmus University: a top-100 ranked international research university based in Rotterdam the Netherlands.',
    'IBM is the global leader in business transformation through an open hybrid cloud platform and AI serving clients in more than 170 countries around the world.',
    'The University of Illinois at Urbana-Champaign is a world leader in research teaching and public engagement distinguished by the breadth of its programs broad academic excellence.',
    'The University of Pennsylvania (commonly referred to as Penn) is a private university located in Philadelphia Pennsylvania United States.',
    'A premier institution of higher education The University of Virginia offers outstanding academics world-class faculty and an inspiring supportive environment.',
  ];

  for (let id = 1; id <= courses; id++) {
    const index = Math.floor(Math.random() * offeredByNames.length);
    const offeredBy = `${id + ((count - 1) * courses)},${index},${offeredByNames[index]},${offeredBysDescription[index]}`;
    offeredBys.push(offeredBy);
  }

  const stream = fs.createWriteStream('./db/seeders/id_offeredbys.csv', { flags: 'a' });
  const string = `\n${offeredBys.join('\n')}`;
  stream.write(string);
  return offeredBys;
};

const stream = fs.createWriteStream('./db/seeders/id_offeredbys.csv', { flags: 'w' });
stream.write('course_id,offeredby_id,offeredby_name,offeredby_description');
let count = 1;
console.time('Generate offeredbys');
while (count <= numBatches) {
  generateOfferedBys(batchSize, count);
  count++;
}
console.timeEnd('Generate offeredbys');

module.exports = generateOfferedBys;
