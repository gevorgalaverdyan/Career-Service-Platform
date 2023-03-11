import React from 'react';
import JobBoardItem from '../components/JobBoardRowItem';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getJobs } from '../features/jobs/jobsSlice';
import Spinner from '../components/Spinner';

function JobBoardPostings() {
  const { jobs } = useSelector((state: any) => state.jobs);

  const dispatch: any = useDispatch();

  useEffect(() => {
    dispatch(getJobs());
  }, [dispatch]);

  if (!jobs) {
    return <Spinner />;
  }

  return (
    <div className='tickets'>
      <div className='ticket-headings'>
        <div>Apply</div>
        <div>Deadline</div>
        <div>Job Title</div>
        <div>Location</div>
      </div>
      {jobs.map((job: any) => (
        <JobBoardItem job={job} key={job.jobId} />
      ))}
    </div>
  );
}

export default JobBoardPostings;
