/* eslint-disable no-underscore-dangle */
/* eslint-disable no-plusplus */
const { TestimonialsModel } = require('../../db/models.js');

const testimonialsInsert = async (req, res) => {
  const data = req.body;
  let maxID = await TestimonialsModel.find().select('_id').sort([['_id', -1]]).limit(1);
  maxID = maxID[0]?._id ? maxID[0]._id : 0;
  Object.keys(data).forEach((key) => {
    maxID++;
    data[key]._id = maxID;
  });

  TestimonialsModel.insertMany(data, (err, docs) => {
    if (err) return res.status(400).send(err.message);
    return res.send(docs);
  });
};

const getTestimonials = (req, res) => {
  const courseNumbers = req.params.courseNumbers.split(',').map((id) => parseInt(id, 10));
  TestimonialsModel.find({ _id: { $in: courseNumbers } }, (err, docs) => {
    if (err || docs.length === 0) return res.status(400).send(err?.message || 'No records found.');
    return res.send(docs);
  });
};

const setTestimonial = (req, res) => {
  const courseId = parseInt(req.params.testimonialid, 10);
  const update = req.body;

  TestimonialsModel.findOneAndUpdate(
    { _id: courseId },
    update,
    { new: true, useFindAndModify: false },
    (err, docs) => {
      if (err || !docs) return res.status(400).send(err?.message || 'No records found.');
      return res.send(docs);
    },
  );
};

const deleteTestimonial = (req, res) => {
  const testimonial = parseInt(req.params.testimonialid, 10);
  TestimonialsModel.findByIdAndRemove(testimonial, (err, docs) => {
    if (err) return res.status(400).send(err.message);
    return res.send(docs);
  });
};

module.exports = {
  testimonialsInsert,
  getTestimonials,
  setTestimonial,
  deleteTestimonial,
};
