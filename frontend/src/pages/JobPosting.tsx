import React, { useEffect } from 'react';
import './styles/JobPostingStyles.css';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Spinner from '../components/Spinner';
import { toast } from 'react-toastify';
import { getJob } from '../features/jobs/jobsSlice';
import { createApplication } from '../features/application/applicationSlice';
import { reset } from '../features/application/applicationSlice';

function JobPosting() {
  const isCompany = false; //fixable

  //useeffect that will get the ticket from the state through _id
  const { job, isLoading, isError, message } = useSelector(
    (state: any) => state.jobs
  );

  const {
    isLoading: applicationIsLoading,
    isError: applicationIsError,
    isSuccess: applicationIsSuccess,
    message: applicationMessage,
  } = useSelector((state: any) => state.applications);

  const { user } = useSelector((state: any) => state.auth);

  const dispatch: any = useDispatch();
  const { jobId } = useParams();
  const navigate = useNavigate();

  const { title, company, description, deadline } = job;
  const { userId } = user;

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (typeof jobId === 'undefined') {
      toast.error('WRONG jobID');
      navigate('/job-postings');
    } else if (typeof jobId === 'string') {
      dispatch(getJob(jobId));
    }
  }, [isError, message, jobId, navigate, dispatch]);

  useEffect(() => {
    if (applicationIsError) {
      toast.error(applicationMessage);
    }

    if (applicationIsSuccess) {
      dispatch(reset());
      navigate('/job-postings');
    }
  }, [
    applicationIsError,
    applicationIsSuccess,
    applicationMessage,
    navigate,
    dispatch,
  ]);

  const onClick = (e: any) => {
    e.preventDefault();

    try {
      const applicationIDs = {
        jobId,
        userId,
      };

      dispatch(createApplication(applicationIDs))
        .then(() => {
          navigate('/job-postings');
          toast.success('Applied successfully');
        })
        .catch(toast.error);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  if (isError) {
    return <h1>ERROR</h1>;
  }

  if (isLoading || applicationIsLoading) {
    return <Spinner />;
  }

  return (
    <div className='job-posting'>
      <section className='heading'>
        <h3 className='title'>{title}</h3>
      </section>

      <table>
        <tbody>
          <tr>
            <td className='boldpart'>Company</td>
            <td>{company}</td>
          </tr>

          <tr>
            <td className='boldpart'>Job Description</td>
            <td>{description}</td>
          </tr>

          <tr>
            <td className='boldpart'>Expiration Date:</td>
            <td>{deadline}</td>
          </tr>
        </tbody>
      </table>

      <button className='button' onClick={onClick}>
        Apply
      </button>
    </div>
  );
}

export default JobPosting;
