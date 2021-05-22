/* eslint-disable no-underscore-dangle */
/* eslint-disable no-plusplus */
const client = require('../../../db/postgres/database.js');

const createInstructors = async (req, res) => {
  const data = req.body;
  const options = [
    data.firstname,
    data.middleinitial,
    data.lastname,
    data.academic_title,
    data.title,
    data.organization,
    data.learners,
    data.instructor_avg_rating,
    data.num_ratings,
  ];
  const primaryInstructors = [];
  const assistInstructors = [];
  let param = 10;
  let query;

  data.courses.forEach((course) => {
    if (course.isPrimaryInstructor) {
      options.push(course.courseNumber);
      primaryInstructors.push(`($${param}::int,(SELECT instructor_id FROM new_instructor))`);
      param++;
    } else {
      options.push(course.courseNumber);
      assistInstructors.push(`($${param}::int,(SELECT instructor_id FROM new_instructor))`);
      param++;
    }
  });
  if (primaryInstructors.length && assistInstructors.length) {
    query = `WITH new_instructor AS (INSERT INTO coursera.instructor_details(firstname,middleinitial,lastname,academic_title,title,organization,learners,instructor_avg_rating,num_ratings) VALUES ($1::text, $2::text, $3::text, $4::text, $5::text, $6::text, $7::int, $8::text, $9::int) RETURNING instructor_id), new_primary_instructor AS (INSERT INTO coursera.primary_instructors(course_id,instructor_id) VALUES ${primaryInstructors.join(',')} ) INSERT INTO coursera.assistant_instructors(course_id,instructor_id) VALUES ${assistInstructors.join(',')} RETURNING instructor_id`;
  } else if (primaryInstructors.length && !assistInstructors.length) {
    query = `WITH new_instructor AS (INSERT INTO coursera.instructor_details(firstname,middleinitial,lastname,academic_title,title,organization,learners,instructor_avg_rating,num_ratings) VALUES ($1::text, $2::text, $3::text, $4::text, $5::text, $6::text, $7::int, $8::text, $9::int) RETURNING instructor_id) INSERT INTO coursera.primary_instructors(course_id,instructor_id) VALUES ${primaryInstructors.join(',')}) RETURNING instructor_id`;
  } else if (!primaryInstructors.length && assistInstructors.length) {
    query = `WITH new_instructor AS (INSERT INTO coursera.instructor_details(firstname,middleinitial,lastname,academic_title,title,organization,learners,instructor_avg_rating,num_ratings) VALUES ($1::text, $2::text, $3::text, $4::text, $5::text, $6::text, $7::int, $8::text, $9::int) RETURNING instructor_id) INSERT INTO coursera.assistant_instructors(course_id,instructor_id) VALUES ${assistInstructors.join(',')} RETURNING instructor_id`;
  } else {
    query = 'INSERT INTO coursera.instructor_details(firstname,middleinitial,lastname,academic_title,title,organization,learners,instructor_avg_rating,num_ratings) VALUES ($1::text, $2::text, $3::text, $4::text, $5::text, $6::text, $7::int, $8::text, $9::int) RETURNING instructor_id';
  }
  const sql = {
    text: query,
    values: options,
  };
  const response = await client.query(sql);
  return res.send(response.rows);
};

const getInstructors = async (req, res) => {
  const courseNumber = parseInt(req.params.courseNumber, 10);
  const sql = {
    text: 'WITH ids AS (SELECT instructor_id, is_primary_instructor FROM ((SELECT instructor_id, 1 AS is_primary_instructor FROM coursera.primary_instructors WHERE course_id=$1::int) UNION ALL (SELECT instructor_id, 0 AS is_primary_instructor FROM coursera.assistant_instructors WHERE course_id=$1::int)) t) SELECT * FROM coursera.instructor_details t1 INNER JOIN (SELECT * FROM ids) t2 ON t1.instructor_id=t2.instructor_id',
    values: courseNumber,
  };
  const response = await client.query(sql);
  return res.send(response.rows);
};

const getPrimaryInstructor = async (req, res) => {
  const courseId = parseInt(req.params.courseNumber, 10);
  const sql = {
    text: 'SELECT * FROM coursera.instructor_details WHERE instructor_id IN (SELECT instructor_id FROM coursera.primary_instructors WHERE course_id=$1::int)',
    values: courseId,
  };
  const response = await client.query(sql);
  return res.send(response.rows);
};

const setInstructor = async (req, res) => {
  const id = parseInt(req.params.instructorid, 10);
  const options = [];
  Object.entries(req.body).forEach((key, val) => {
    options.push(`${key}=${val}`);
  });
  const sql = {
    text: `UPDATE coursera.instructor_details SET ${options} WHERE instructor_id = ${id}::int RETURNING ${Object.keys(req.body).join(',')}`,
    values: [],
  };
  const response = await client.query(sql);
  return res.send(response.rows);
};

const deleteInstructor = async (req, res) => {
  const id = parseInt(req.params.instructorid, 10);
  const sql = {
    text: 'DELETE FROM coursera.instructor_details WHERE instructor_id = $1::int',
    values: [id],
  };
  const response = await client.query(sql);
  return res.send(response.rows);
};

module.exports = {
  createInstructors,
  getInstructors,
  getPrimaryInstructor,
  setInstructor,
  deleteInstructor,
};
