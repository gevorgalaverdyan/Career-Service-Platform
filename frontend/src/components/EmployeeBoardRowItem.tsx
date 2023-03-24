import React from 'react';
import { Link } from 'react-router-dom';
import { Posting } from '../common/types';

function EmployeeBoardRowItem(props: Posting) {
    const { job } = props;

    return (
        <div className='ticket'>
      <Link to={`/manage-posting/${job.jobId}`} className='btn btn-reverse btn-sm'>
        Update
      </Link>
      <div>{job.deadline}</div>
      <div>{job.title}</div>
      <div>{job.company}</div>
    </div>
    )
}

export default EmployeeBoardRowItem;