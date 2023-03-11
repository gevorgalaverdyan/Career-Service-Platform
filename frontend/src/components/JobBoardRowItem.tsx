import React from 'react';
import { Link } from 'react-router-dom';
import { Posting } from '../common/types';

function JobBoardItem(props: Posting) {
  const { job } = props;

  return (
    <div className='ticket'>
      <Link to={`/ticket/${job.jobId}`} className='btn btn-reverse btn-sm'>
        Apply
      </Link>
      <div>{job.deadline}</div>
      <div>{job.title}</div>
      <div>{job.company}</div>
    </div>
  );
}

export default JobBoardItem;
