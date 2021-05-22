/* eslint-disable no-underscore-dangle */
/* eslint-disable no-plusplus */
const client = require('../../../db/postgres/database.js');

const schema = process.env.NODE_ENV === 'test' ? 'test' : 'coursera';

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
    query = `WITH new_instructor AS (INSERT INTO ${schema}.instructor_details(firstname,middleinitial,lastname,academic_title,title,organization,learners,instructor_avg_rating,num_ratings) VALUES ($1::text, $2::text, $3::text, $4::text, $5::text, $6::text, $7::int, $8::text, $9::int) RETURNING instructor_id), new_primary_instructor AS (INSERT INTO ${schema}.primary_instructors(course_id,instructor_id) VALUES ${primaryInstructors.join(',')} ) INSERT INTO ${schema}.assistant_instructors(course_id,instructor_id) VALUES ${assistInstructors.join(',')} RETURNING instructor_id`;
  } else if (primaryInstructors.length && !assistInstructors.length) {
    query = `WITH new_instructor AS (INSERT INTO ${schema}.instructor_details(firstname,middleinitial,lastname,academic_title,title,organization,learners,instructor_avg_rating,num_ratings) VALUES ($1::text, $2::text, $3::text, $4::text, $5::text, $6::text, $7::int, $8::text, $9::int) RETURNING instructor_id) INSERT INTO ${schema}.primary_instructors(course_id,instructor_id) VALUES ${primaryInstructors.join(',')}) RETURNING instructor_id`;
  } else if (!primaryInstructors.length && assistInstructors.length) {
    query = `WITH new_instructor AS (INSERT INTO ${schema}.instructor_details(firstname,middleinitial,lastname,academic_title,title,organization,learners,instructor_avg_rating,num_ratings) VALUES ($1::text, $2::text, $3::text, $4::text, $5::text, $6::text, $7::int, $8::text, $9::int) RETURNING instructor_id) INSERT INTO ${schema}.assistant_instructors(course_id,instructor_id) VALUES ${assistInstructors.join(',')} RETURNING instructor_id`;
  } else {
    query = `INSERT INTO ${schema}.instructor_details(firstname,middleinitial,lastname,academic_title,title,organization,learners,instructor_avg_rating,num_ratings) VALUES ($1::text, $2::text, $3::text, $4::text, $5::text, $6::text, $7::int, $8::text, $9::int) RETURNING instructor_id`;
  }
  const sql = {
    text: query,
    values: options,
  };
  try {
    const response = await client.query(sql);
    return res.send(response.rows);
  } catch (err) {
    return res.status(400).send(err.message);
  }
};

const getInstructors = async (req, res) => {
  const courseNumber = parseInt(req.params.courseNumber, 10);
  const sql = {
    text: `WITH ids AS (SELECT instructor_id, is_primary_instructor FROM ((SELECT instructor_id, 1 AS is_primary_instructor FROM ${schema}.primary_instructors WHERE course_id=$1::int) UNION ALL (SELECT instructor_id, 0 AS is_primary_instructor FROM ${schema}.assistant_instructors WHERE course_id=$1::int)) t) SELECT * FROM ${schema}.instructor_details t1 INNER JOIN (SELECT * FROM ids) t2 ON t1.instructor_id=t2.instructor_id`,
    values: [courseNumber],
  };
  try {
    const response = await client.query(sql);
    if (response.rows.length === 0) throw new Error('No instructors associated with the course number.');
    return res.send(response.rows);
  } catch (err) {
    return res.status(400).send(err.message);
  }
};

const getPrimaryInstructor = async (req, res) => {
  const courseId = parseInt(req.params.courseNumber, 10);
  const sql = {
    text: `SELECT * FROM ${schema}.instructor_details WHERE instructor_id IN (SELECT instructor_id FROM ${schema}.primary_instructors WHERE course_id=$1::int)`,
    values: courseId,
  };
  try {
    const response = await client.query(sql);
    if (response.rows.length === 0) throw new Error('No primary instructor with the course number.');
    return res.send(response.rows);
  } catch (err) {
    return res.status(400).send(err.message);
  }
};

const setInstructor = async (req, res) => {
  const id = parseInt(req.params.instructorid, 10);
  const options = [];
  Object.entries(req.body).forEach((key, val) => {
    options.push(`${key}=${val}`);
  });
  const sql = {
    text: `UPDATE ${schema}.instructor_details SET ${options} WHERE instructor_id=${id}::int RETURNING ${Object.keys(req.body).join(',')}`,
    values: [],
  };
  try {
    const response = await client.query(sql);
    if (response.rows.length === 0) throw new Error('No instrutors found with matching id.');
    return res.send(response.rows);
  } catch (err) {
    return res.status(400).send(err.message);
  }
};

const deleteInstructor = async (req, res) => {
  const id = parseInt(req.params.instructorid, 10);
  const sql = {
    text: `DELETE FROM ${schema}.instructor_details WHERE instructor_id=$1::int RETURNING instructor_id`,
    values: [id],
  };
  try {
    const response = await client.query(sql);
    if (response.rows.length === 0) throw new Error('No instrutors found with matching id.');
    return res.send(response.rows);
  } catch (err) {
    return res.status(400).send(err.message);
  }
};

module.exports = {
  createInstructors,
  getInstructors,
  getPrimaryInstructor,
  setInstructor,
  deleteInstructor,
};
