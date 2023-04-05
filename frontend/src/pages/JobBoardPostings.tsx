import React from 'react';
import JobBoardItem from '../components/JobBoardRowItem';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getJobs } from '../features/jobs/jobsSlice';
import Spinner from '../components/Spinner';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import './styles/JobBoardPosting.css';

function JobBoardPostings() {
  const { jobs, isLoading, isError, message } = useSelector(
    (state: any) => state.jobs
  );

  const dispatch: any = useDispatch();
  const navigate = useNavigate();

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
      <button className='SortButton'>Filter By Deadline</button>

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
