import React from 'react'
import { Link } from 'react-router-dom';

function JobBoardItem(props:any) {
    const {posting} = props
    
  return (
    <div className='ticket'>
      <Link to={`/ticket/`} className='btn btn-reverse btn-sm'>
        Apply
      </Link>
      <div>{posting.deadline}</div>
      <div>{posting.title}</div>
      <div>{posting.location}</div>
    </div>
  );
}

export default JobBoardItem