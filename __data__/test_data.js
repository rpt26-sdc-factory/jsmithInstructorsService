module.exports = {
  testInstructors: [
    {
      firstname: 'Frank',
      middleinitial: 'C',
      lastname: 'Armstrong',
      academic_title: 'Instructor',
      title: 'Global Creative Producer',
      organization: 'Centenary University',
      learners: 426,
      courses: [
        {
          courseNumber: 1,
          isPrimaryInstructor: true,
        },
        {
          courseNumber: 2,
          isPrimaryInstructor: false,
        },
        {
          courseNumber: 3,
          isPrimaryInstructor: false,
        },
      ],
      instructor_avg_rating: '4.1',
      num_ratings: 816,
    },
    {
      firstname: 'Hosea',
      middleinitial: 'C',
      lastname: 'Lemke',
      academic_title: 'Professor',
      title: 'Central Division Manager',
      organization: 'Ohio State University',
      learners: 2790,
      courses: [
        {
          courseNumber: 2,
          isPrimaryInstructor: true,
        },
        {
          courseNumber: 3,
          isPrimaryInstructor: true,
        },
        {
          courseNumber: 5,
          isPrimaryInstructor: false,
        },
      ],
      instructor_avg_rating: '4.6',
      num_ratings: 5965,
    },
  ],
};
