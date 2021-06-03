/* eslint-disable no-undef */
/* eslint-disable import/extensions */
/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import initialState from './initialState.js';
import Title from './Title.jsx';
import Name from './Name.jsx';
import About from './About.jsx';
import Image from './Image.jsx';

const OfferedBy = () => {
  const splitPath = window.location.pathname.split('/')[1];
  const course = splitPath || 1;
  // eslint-disable-next-line no-unused-vars
  const [courseNumber, setCourseNumber] = useState(course);
  const [offeredByData, setOfferedByData] = useState({
    id: 0,
    offeredByIndex: 0,
    offeredByName: '',
    offeredByDescription: '',
  });
  const [imagesData, setImagesData] = useState({
    id: 0,
    offeredBy: 0,
    offeredByAbout: '',
    offeredByMain: '',
    primaryInstructor: '',
    additionalInstructors: [{
      instructorId: 0,
      instructorImage: '',
    }],
    testimonial1Image: '',
    testimonial1Id: 0,
    testimonial2Image: '',
    testimonial2Id: 0,
    testimonial3Image: '',
    testimonial3Id: 0,
    courseIcon: '',
  });
  const offeredByPort = 3003;
  const imagesPort = 3006;
  // GET and set instructors data for this course as state
  useEffect(() => {
    fetch(`http://localhost:${offeredByPort}/api/offeredbys/${courseNumber}`)
      .then((offeredByResponse) => offeredByResponse.json())
      .then((offeredByJSON) => {
        setOfferedByData(offeredByJSON);
        return fetch(`http://localhost:${imagesPort}/api/images/${courseNumber}`);
      })
      .then((imagesResponse) => imagesResponse.json())
      .then((imagesJSON) => {
        setImagesData(imagesJSON);
      })
      .catch((err) => { if (err) { console.error(err); } });
  }, []);

  return (
    <div className="offered-by">
      <Title />
      <div className="offered-by-outer-grid">
        <Image imagesData={imagesData} />
        <div className="offered-by-inner-grid">
          <Name offeredByData={offeredByData} />
          <About offeredByData={offeredByData} />
        </div>
      </div>
    </div>
  );
};

export default OfferedBy;
