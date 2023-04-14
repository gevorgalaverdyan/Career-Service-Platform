import React from 'react';
import { Link } from 'react-router-dom';
import {MdConstruction} from 'react-icons/md'
import ReadMe from '../components/ReadMe';

function Main() {
  return (
    <>
      <Link to={'/job-postings'} className='btn'>
        Job Postings
      </Link>
      <br />
      <Link to={'/user-profile'} className='btn'>
        My Profile
      </Link>

      <MdConstruction size={50} style={{margin: '10px'}}/>
      <br /><br />
      <ReadMe/>
    </>
  );
}

export default Main;
