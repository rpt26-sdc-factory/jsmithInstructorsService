/* eslint-disable no-undef */
/* eslint-disable import/extensions */
import React from 'react';
import ReactDOM from 'react-dom';
import Instructors from './components/instructors/Instructors.jsx';
import OfferedBy from './components/offeredBy/OfferedBy.jsx';
import Testimonials from './components/testimonials/Testimonials.jsx';
import './styles.css';

ReactDOM.render(<Instructors />, document.getElementById('instructors'));
ReactDOM.render(<OfferedBy />, document.getElementById('offered-by'));
ReactDOM.render(<Testimonials />, document.getElementById('testimonials'));
