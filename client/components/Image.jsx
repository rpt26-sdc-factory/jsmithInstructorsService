/* eslint-disable react/prop-types */
import React from 'react';

const Image = ({ image }) => (
  <div>
    <img className="instructor-image" src={image || ''} alt="Instructor" />
  </div>
);

export default Image;
