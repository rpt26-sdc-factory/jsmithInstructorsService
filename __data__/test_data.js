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
      ],
      instructor_avg_rating: '4.6',
      num_ratings: 5965,
    },
  ],
  testOfferedBys: [
    {
      offeredby_id: 1,
      offeredby_name: 'University of Pennsylvania',
      offeredby_description: 'The University of Pennsylvania (commonly referred to as Penn) is a private university, located in Philadelphia, Pennsylvania, United States. A member of the Ivy League, Penn is the fourth-oldest institution of higher education in the United States, and considers itself to be the first university in the United States with both undergraduate and graduate studies.',
    },
    {
      offeredby_id: 2,
      offeredby_name: 'University of Virginia',
      offeredby_description: 'A premier institution of higher education, The University of Virginia offers outstanding academics, world-class faculty, and an inspiring, supportive environment. Founded by Thomas Jefferson in 1819, the University is guided by his vision of discovery, innovation, and development of the full potential of students from all walks of life. Through these courses, global learners have an opportunity to study with renowned scholars and thought leaders.',
    },
  ],
  testTestimonials: [
    {
      course_id: 1,
      username: 'Branson V.',
      testimonial: 'Eius ut aut. Accusantium atque eveniet qui consequatur velit quasi magni. Quia iusto nostrum est nam at. Quasi accusamus quasi quo quas rerum.',
    },
    {
      course_id: 2,
      username: 'Misael G.',
      testimonial: 'Quod ipsum nihil laboriosam. Illo et non. In molestias aperiam facilis. Dolores a illum illum nam iure. Eum voluptate adipisci eos impedit. Eveniet quia est dolorum.',
    },
    {
      course_id: 3,
      username: 'Aubrey K.',
      testimonial: 'Quia quo quas fugit nobis incidunt ipsa. Consequatur et error excepturi sunt impedit. Ipsum fuga vel numquam occaecati necessitatibus sed cum.',
    },
  ],
};
