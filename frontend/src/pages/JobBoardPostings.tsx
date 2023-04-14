import React, { useState } from 'react';
import JobBoardItem from '../components/JobBoardRowItem';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getJobs } from '../features/jobs/jobsSlice';
import Spinner from '../components/Spinner';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import './styles/JobBoardPostingsStyles.css';
import { FaSortNumericDown, FaSortNumericUp } from 'react-icons/fa';

function JobBoardPostings() {
  const { jobs, isLoading, isError, message } = useSelector(
    (state: any) => state.jobs
  );

  const dispatch: any = useDispatch();
  const navigate = useNavigate();

  //Sorting Feature
  const [sortOrder, setSortOrder] = useState('asc');
  const handleSort = () => {
    const newOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(newOrder);
  };

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

  if (isLoading || !jobs) {
    return <Spinner />;
  }

  return (
    <div className='tickets'>
      <button
        className='btn'
        onClick={handleSort}
        style={{ marginBottom: '20px' }}
      >
        Sort by Deadline
        {sortOrder === 'asc' ? (
          <FaSortNumericDown style={{ marginLeft: '20px' }} size={20} />
        ) : (
          <FaSortNumericUp style={{ marginLeft: '20px' }} size={20} />
        )}
      </button>
      <div className='ticket-headings'>
        <div>Apply</div>
        <div>Deadline</div>
        <div>Job Title</div>
        <div>Company</div>
      </div>
      {jobs
        .filter((job: any) => job.deadline)
        .sort((job1: { deadline: string }, job2: { deadline: string }) => {
          if (sortOrder === 'asc') {
            return (
              new Date(job1.deadline as string).getTime() -
              new Date(job2.deadline as string).getTime()
            );
          } else {
            return (
              new Date(job2.deadline as string).getTime() -
              new Date(job1.deadline as string).getTime()
            );
          }
        })
        .map((job: any) => (
          <JobBoardItem job={job} key={job.jobId} />
        ))}
    </div>
  );
}

export default JobBoardPostings;
