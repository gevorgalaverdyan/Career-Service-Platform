import React from 'react';
import { Link } from 'react-router-dom';

function Main() {
  return (
    <>
      <p>Main</p>
      <Link to={'job-postings'} className='btn'>Job Postings</Link>
    </>
  );
}

export default Main;
