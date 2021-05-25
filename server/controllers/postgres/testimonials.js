/* eslint-disable no-underscore-dangle */
/* eslint-disable no-plusplus */
const client = require('../../../db/postgres/database.js');

const schema = process.env.NODE_ENV === 'test' ? 'test' : 'coursera';

const testimonialsInsert = async (req, res) => {
  const data = req.body;
  const options = [
    data.course_id,
    data.username,
    data.testimonial,
  ];
  const sql = {
    text: `INSERT INTO ${schema}.testimonials (course_id,username,testimonial) VALUES ($1::int, $2::text, $3::text) RETURNING testimonial_id`,
    values: options,
  };
  try {
    const response = await client.query(sql);
    return res.send(response.rows);
  } catch (err) {
    return res.status(400).send(err.message);
  }
};

const getTestimonials = async (req, res) => {
  const courseNumber = parseInt(req.params.courseNumber, 10);
  const sql = {
    text: `SELECT * FROM ${schema}.testimonials WHERE course_id=$1::int`,
    values: [courseNumber],
  };
  try {
    const response = await client.query(sql);
    if (response.rows.length === 0) throw new Error('No testimonials associated with the course number.');
    return res.send(response.rows);
  } catch (err) {
    return res.status(400).send(err.message);
  }
};

const setTestimonial = async (req, res) => {
  const testimonialId = parseInt(req.params.testimonialid, 10);
  const options = [];
  Object.keys(req.body).forEach((key) => {
    if (key !== 'course_id') {
      options.push(`${key}='${req.body[key]}'`);
    } else {
      options.push(`${key}=${req.body[key]}`);
    }
  });
  const sql = {
    text: `UPDATE ${schema}.testimonials SET ${options.join(',')} WHERE testimonial_id=$1::int RETURNING ${Object.keys(req.body).join(',')}`,
    values: [testimonialId],
  };
  try {
    const response = await client.query(sql);
    if (response.rows.length === 0) throw new Error('No matching testimonial found.');
    return res.send(response.rows);
  } catch (err) {
    return res.status(400).send(err.message);
  }
};

const deleteTestimonial = async (req, res) => {
  const testimonialId = parseInt(req.params.testimonialid, 10);
  const sql = {
    text: `DELETE FROM ${schema}.testimonials WHERE testimonial_id=$1::int RETURNING testimonial_id`,
    values: [testimonialId],
  };
  try {
    const response = await client.query(sql);
    if (response.rows.length === 0) throw new Error('No matching testimonials found.');
    return res.send(response.rows);
  } catch (err) {
    return res.status(400).send(err.message);
  }
};

module.exports = {
  testimonialsInsert,
  getTestimonials,
  setTestimonial,
  deleteTestimonial,
};
