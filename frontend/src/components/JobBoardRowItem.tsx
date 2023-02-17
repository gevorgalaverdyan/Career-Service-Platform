import React from 'react';
import { Link } from 'react-router-dom';

interface Posting {
  posting: {
    id: number;
    title: string;
    deadline: string;
    location: string;
  };
}

function JobBoardItem(props: Posting) {
  const { posting } = props;

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

export default JobBoardItem;
