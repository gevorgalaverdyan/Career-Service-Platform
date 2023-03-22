import React from 'react';
import { Link } from 'react-router-dom';

function Main() {
  return (
    <>
      <Link to={'job-postings'} className='btn'>
        Job Postings
      </Link>
      <br />
      <Link to={'user-applications'} className='btn'>
        My Applications
      </Link>
    </>
  );
}

export default Main;
