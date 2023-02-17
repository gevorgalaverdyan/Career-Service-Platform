import React from 'react';
import JobBoardItem from '../components/JobBoardRowItem';

function JobPostings() {
  const postings = [
    {
      id: 1,
      title: 'Software Dev',
      deadline: '12/9/2023',
      location: 'Montreal',
    },
    {
      id: 2,
      title: 'It Support',
      deadline: '5/10/2023',
      location: 'Montreal',
    },
  ];

  return (
    <div className='tickets'>
      <div className='ticket-headings'>
        <div>Apply</div>
        <div>Deadline</div>
        <div>Job Title</div>
        <div>Location</div>
      </div>
      {postings.map((posting) => (
        <JobBoardItem posting={posting} key={posting.id} />
      ))}
    </div>
  );
}

export default JobPostings;
