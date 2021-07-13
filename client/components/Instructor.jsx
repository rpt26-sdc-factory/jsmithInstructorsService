/* eslint-disable react/destructuring-assignment */
/* eslint-disable import/extensions */
/* eslint-disable react/prop-types */
import React from 'react';
import Details from './Details.jsx';
import Image from './Image.jsx';

const Instructor = (props) => (
  <div className="actual-instructor">
    <Image image={props.image} />
    <Details instructor={props.instructor} svgs={props.svgs} />
  </div>
);

export default Instructor;
