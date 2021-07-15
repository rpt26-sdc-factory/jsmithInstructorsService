/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable import/extensions */
/* eslint-disable no-plusplus */
/* eslint-disable no-undef */
/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import initialState from './initialState';
import Instructor from './Instructor.jsx';

const Instructors = (props) => {
  return (
    <div className="instructors">
      <div className="instructor-label">
        {props.label}
      </div>
      <span className="instructors-rating">
        {'Instructor rating '}
        <span>
          <svg className="instructors-svg" viewBox="0 0 90 90">
            <path d={props.svgs?.instructorSVG} />
          </svg>
        </span>
        <span className="instructors-ratings">
          {`${props.instructorsData[0].instructor_avg_rating}/5 (${props.instructorsData[0].num_ratings} Ratings)`}
        </span>
        <span>
          <svg className="instructors-infoSVG" viewBox="0 0 80 80" height="30px" width="30px">
            <path d={props.svgs?.infoSVG?.i} />
            <path d={props.svgs?.infoSVG?.dot} />
            <polygon points={props.svgs?.infoSVG?.circle} />
          </svg>
        </span>
      </span>
      <div className="instructor-grid" id={props.gridClass}>
        {props.instructorsData.map((instructor, index) => {

          const allCourses = instructor.courses?.length || 0;
          let isPrimary = false;
          let image = props.primaryInstructorImage;
          // is instructor primary?
          for (let i = 0; i < allCourses; i++) {
            if (instructor.courses[i].courseNumber === props.courseNumber) {
              isPrimary = true;
            }
          }

          if (!isPrimary) {
            for (let i = 0; i < props.additionalInstructorImages?.length; i++) {
              if (instructor.id === props.additionalInstructorImages[i]?.instructorId) {
                image = props.additionalInstructorImages[i]?.instructorImage;
                break;
              }
            }
          }
          return <Instructor key={'instructor'.concat(index)} image={image} instructor={instructor} svgs={props.svgs} courseNumber={props.courseNumber} />;
        })}
      </div>
    </div>
  );
};

export default Instructors;
