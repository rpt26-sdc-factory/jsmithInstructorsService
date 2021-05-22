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
    text: 'INSERT INTO coursera.offeredbys (offeredby_id,offeredby_name,offeredby_description) VALUES ($1::int, $2::text, $3::text)',
    values: options,
  };
  const response = await client.query(sql);
  return res.send(response.rows);
};

const getOfferedBys = async (req, res) => {
  const courseNumber = parseInt(req.params.courseNumbers, 10);
  const sql = {
    text: `SELECT * FROM coursera.offeredbys WHERE course_id=${1}`,
    values: courseNumber,
  };
  const response = await client.query(sql);
  return res.send(response.rows);
};

const setOfferedBy = async (req, res) => {
  const courseNumber = parseInt(req.params.courseNumber, 10);
  const options = [];
  Object.entries(req.body).forEach((key, val) => {
    options.push(`${key}=${val}`);
  });
  const sql = {
    text: `UPDATE coursera.offeredbys SET (${options}) WHERE course_id=$1::int`,
    values: courseNumber,
  };
  const response = await client.query(sql);
  return res.send(response.rows);
};

const deleteOfferedBy = async (req, res) => {
  const courseNumber = parseInt(req.params.courseNumber, 10);
  const sql = {
    text: 'DELETE FROM coursera.offeredbys WHERE instructor_id=$1::int',
    values: [courseNumber],
  };
  const response = await client.query(sql);
  return res.send(response.rows);
};

module.exports = {
  offeredBysInsert,
  getOfferedBys,
  setOfferedBy,
  deleteOfferedBy,
};
