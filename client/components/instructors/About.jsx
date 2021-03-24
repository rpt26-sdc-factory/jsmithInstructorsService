import React from 'react';

const About = (props) => {
  const instructorAcademicTitle = props.instructor.academicTitle === 'PhD' ? 'Dr. ' : '';
  const courses = props.instructor.courses.length === 1 ? 'Course' : 'Courses';
  return (
    <div className="instructor-details">
      <div className="instructor-name">
        {`${instructorAcademicTitle}${props.instructor.firstName} ${props.instructor.lastName}`}
      </div>
      <div className="instructor-title">
        {props.instructor.academicTitle}
      </div>
      <div className="instructor-org">
        {props.instructor.organization}
      </div>
      {/* Learners SVG here */}
      <div className="instructor-learners">
        <svg className="instructor-learnersSVG" viewBox="0 0 80 80" height="18px" width="18px">
          <path d={props.svgs.learnersSVG}></path>
        </svg>
        {`${props.instructor.learners} Learners`}
      </div>
      {/* Courses SVG here */}
      <div className="instructor-courses">
        <svg className="instructor-coursesSVG" viewBox="0 0 80 80" height="18px" width="18px">
          <path d={props.svgs.coursesSVG}></path>
        </svg>
        {`${props.instructor.courses.length} ${courses}`}
      </div>
    </div>
  );
};

export default About;