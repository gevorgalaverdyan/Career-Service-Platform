import React from 'react';
import JobBoardItem from '../components/JobBoardRowItem';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getJobs } from '../features/jobs/jobsSlice';
import Spinner from '../components/Spinner';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';



function EmployeeJobPostings() {
    const { jobs, isLoading, isError, message } = useSelector(
    (state: any) => state.jobs
    );

    const { user } = useSelector(
    (state: any) => state.auth
    );

    const [formData, setFormData] = useState({
        company: user.company
    });

    const {
        company
    } = formData;

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
    }, [ isError, message, dispatch, navigate]);

    

        if (isLoading || !jobs) {
    return <Spinner />;
    }

    
    return (
      <div className='tickets'>
        <div className='ticket-headings'>
          <div>More Info</div>
          <div>Deadline</div>
          <div>Job Title</div>
          <div>Company</div>
        </div>
        {jobs.map((job: any) => {
          if (job.company === user.company)
            return <JobBoardItem job={job} key={job.jobId} />;
        })}
      </div>
    );
}



export default EmployeeJobPostings;