import React, { useState } from 'react';
import JobBoardItem from '../components/JobBoardRowItem';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getJobs } from '../features/jobs/jobsSlice';
import Spinner from '../components/Spinner';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import './styles/JobBoardPostingsStyles.css';

function JobBoardPostings() {
  const { jobs, isLoading, isError, message } = useSelector(
    (state: any) => state.jobs
  );

  const dispatch: any = useDispatch();
  const navigate = useNavigate();
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    if (isError) {
      toast.error(message);
      if (message === 'No token provided!') {
        toast.warn('LOGIN AGAIN');
        navigate('/login');
      }
    }

    dispatch(getJobs());
  }, [isError, message, dispatch, navigate]);

  const handleSort = () => {
    const newOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(newOrder);
  };
  
  if (isLoading || !jobs) {
    return <Spinner />;
  }

  return (
    <div className='tickets'>

      <button className='SortButton' onClick={handleSort}>Sort by Deadline</button>
      
      <div className='ticket-headings'>
        <div>Apply</div>
        <div>Deadline</div>
        <div>Job Title</div>
        <div>Company</div>
      </div>
      {jobs.map((job: any) => (
        <JobBoardItem job={job} key={job.jobId} />
      ))}
    </div>
  );
}

export default JobBoardPostings;