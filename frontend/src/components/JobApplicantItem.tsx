import React from 'react';
import { FaFilePdf } from 'react-icons/fa';
import { IoCheckmarkCircle } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { Applicant } from '../common/types';

function JobApplicantItem(applicant: Applicant) {
  const { jobTitle, deadline, resume, status } = applicant;
  return (
    <div className='ticket'>
      <div>{'title'}</div>
      <div>{'company'}</div>
      <div>
        <Link to={'/pdf'}>
          <FaFilePdf size={30} />
        </Link>
      </div>
      <div>
        <IoCheckmarkCircle
          color='green'
          size={35}
          onClick={() => {
            console.log('recruit');
          }}
          style={{ cursor: 'pointer' }}
        />
      </div>
    </div>
  );
}

export default JobApplicantItem;
