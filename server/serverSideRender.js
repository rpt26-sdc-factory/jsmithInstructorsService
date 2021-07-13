const axios = require('axios');

const port = process.env.SERVER_PORT || 3003;
const server = process.env.SERVER_HOST  || 'localhost';
const imagesUrl = process.env.IMAGES_HOST || 'localhost';

const serverSideRender = async (req, res) => {
  const props = {};

  try {
    props.courseNumber = req.params.courseNumber;

    const instructorsData = await axios.get(`http://${server}:${port}/api/instructors/${props.courseNumber}`)
    props.instructorsData = instructorsData.data;
    props.label = instructorsData.data.length > 1 ? 'Instructors' : 'Instructor';

    try {
      const primaryImages = await axios.get(`http://${imagesUrl}:3006/api/image/${props.courseNumber}/primaryInstructor`)
      props.primaryInstructorImage = primaryImages.data;

      const secondaryImages = await axios.get(`http://${imagesUrl}:3006/api/image/${props.courseNumber}/additionalInstructors`)
      props.additionalInstructorImages = secondaryImages.data;

      const svgs = await axios.get(`http://${imagesUrl}:3006/api/svgs`)
      props.svgs = svgs.data;
    } catch (err) {
      console.log('Unable to access images service.');
      props.primaryInstructorImage = '';
      props.additionalInstructorImages = '';
      props.svgs = '';
    }

    props.windowSize = 1040;
    props.gridClass = 'instructor-grid-small';

    return props;

  } catch (err) { return err; }
};

module.exports = serverSideRender;
