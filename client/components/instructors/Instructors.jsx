import React, { useState, useEffect } from 'react';
import initialState from './initialState';

const Instructors = () => {
  const course = window.location.pathname.split('/')[1];
  // console.log('course: ', course);
  const [courseNumber, setCourseNumber] = useState(course);
  const [instructorsData, setInstructorsData] = useState(initialState.syllabusData);
  useEffect(() => {
    fetch(`http://localhost:3003/api/instructors/${courseNumber}`)
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        setInstructorsData(json);
      })
      .catch((err) => {
        if (err) {
          console.error('Error in Instructors component: ', err);
        }
      });
  }, []);

  return (
    <div>Rendered stuff</div>
  );
};

export default Instructors;