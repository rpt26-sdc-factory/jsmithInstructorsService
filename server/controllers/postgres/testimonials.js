/* eslint-disable no-underscore-dangle */
/* eslint-disable no-plusplus */
const client = require('../../../db/postgres/database.js');

const testimonialsInsert = async (req, res) => {
  const data = req.body;
  const options = [
    data.course_id,
    data.username,
    data.testimonial,
  ];
  const sql = {
    text: 'INSERT INTO coursera.testimonials (course_id,username,testimonial) VALUES ($1::int, $2::text, $3::text)',
    values: options,
  };
  const response = await client.query(sql);
  return res.send(response.rows);
};

const getTestimonials = async (req, res) => {
  const courseNumber = parseInt(req.params.courseNumber, 10);
  const sql = {
    text: `SELECT * FROM coursera.testimonials WHERE course_id=${1}`,
    values: [courseNumber],
  };
  const response = await client.query(sql);
  return res.send(response.rows);
};

const setTestimonial = async (req, res) => {
  const testimonialId = parseInt(req.params.testimonial_id, 10);
  const options = [];
  Object.entries(req.body).forEach((key, val) => {
    options.push(`${key}=${val}`);
  });
  const sql = {
    text: `UPDATE coursera.testimonials SET (${options}) WHERE testimonial_id=$1::int`,
    values: [testimonialId],
  };
  const response = await client.query(sql);
  return res.send(response.rows);
};

const deleteTestimonial = async (req, res) => {
  const testimonialId = parseInt(req.params.testimonial_id, 10);
  const sql = {
    text: 'DELETE FROM coursera.testimonials WHERE testimonial_id=$1::int',
    values: [testimonialId],
  };
  const response = await client.query(sql);
  return res.send(response.rows);
};

module.exports = {
  testimonialsInsert,
  getTestimonials,
  setTestimonial,
  deleteTestimonial,
};
