/* eslint-disable no-underscore-dangle */
/* eslint-disable no-plusplus */
const client = require('../../../db/postgres/database.js');

const offeredBysInsert = async (req, res) => {
  const data = req.body;
  const options = [
    data.offeredby_id,
    data.offeredby_name,
    data.offeredby_description,
  ];
  const sql = {
    text: 'INSERT INTO coursera.offeredbys (offeredby_id,offeredby_name,offeredby_description) VALUES ($1::int, $2::text, $3::text) RETURNING course_id',
    values: options,
  };
  try {
    const response = await client.query(sql);
    return res.send(response.rows);
  } catch (err) {
    return res.status(400).send(err.message);
  }
};

const getOfferedBys = async (req, res) => {
  const courseNumber = parseInt(req.params.courseNumbers, 10);
  const sql = {
    text: `SELECT * FROM coursera.offeredbys WHERE course_id=${1}`,
    values: courseNumber,
  };
  try {
    const response = await client.query(sql);
    if (response.rows.length === 0) throw new Error('No offered bys associated with the course number.');
    return res.send(response.rows);
  } catch (err) {
    return res.status(400).send(err.message);
  }
};

const setOfferedBy = async (req, res) => {
  const courseNumber = parseInt(req.params.courseNumber, 10);
  const options = [];
  Object.entries(req.body).forEach((key, val) => {
    options.push(`${key}=${val}`);
  });
  const sql = {
    text: `UPDATE coursera.offeredbys SET (${options}) WHERE course_id=$1::int RETURNING ${Object.keys(req.body).join(',')}`,
    values: courseNumber,
  };
  try {
    const response = await client.query(sql);
    if (response.rows.length === 0) throw new Error('No offered bys matched the course number.');
    return res.send(response.rows);
  } catch (err) {
    return res.status(400).send(err.message);
  }
};

const deleteOfferedBy = async (req, res) => {
  const courseNumber = parseInt(req.params.courseNumber, 10);
  const sql = {
    text: 'DELETE FROM coursera.offeredbys WHERE course_id=$1::int RETURNING course_id',
    values: [courseNumber],
  };
  try {
    const response = await client.query(sql);
    if (response.rows.length === 0) throw new Error('No offered bys matched the course number.');
    return res.send(response.rows);
  } catch (err) {
    return res.status(400).send(err.message);
  }
};

module.exports = {
  offeredBysInsert,
  getOfferedBys,
  setOfferedBy,
  deleteOfferedBy,
};
