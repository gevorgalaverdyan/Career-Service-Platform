import React, { useEffect } from 'react';
import './styles/JobPostingStyles.css';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Spinner from '../components/Spinner';
import { toast } from 'react-toastify';
import { getJob } from '../features/jobs/jobsSlice';

function JobPosting() {
  const isCompany = false; //fixable

  //useeffect that will get the ticket from the state through _id
  const { job, isLoading, isError, message } = useSelector(
    (state: any) => state.jobs
  );

  const dispatch: any = useDispatch();
  const { jobId } = useParams();
  const navigate = useNavigate();

  const { title, company, description, deadline } = job;

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

  if (isError) {
    return <h1>ERROR</h1>;
  }

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div>
      <section className='heading'>
        <h3 className='title'>{job.title}</h3>
      </section>

      <table>
        <tbody>
        <tr>
            <td className='boldpart'>Company</td>
            <td>
            {job.company}
            </td>
          </tr>
          
          <tr>
            <td className='boldpart'>Job Description</td>
            <td>
              {job.description}
            </td>
          </tr>

          <tr>
            <td className='boldpart'>Required Documents</td>
            <td>
              <ol>
                <li>CV</li>
                <li>Cover Letter</li>
                <li>Transcript</li>
              </ol>
            </td>
          </tr>

          <tr>
            <td className='boldpart'>Expiration Date:</td>
            <td>{job.deadline}</td>
          </tr>
        </tbody>
      </table>

      <div className='upload'>
        <label>Resume</label>
        <input type='file' accept='.pdf,.doc,.docx' />
        <br></br>
        <label>Cover Letter</label>
        <input type='file' accept='.pdf,.doc,.docx' />
        <br></br>
        <label>Transcript</label>
        <input type='file' accept='.pdf,.doc,.docx' />
        <br></br>
      </div>

      <button className='button' style={{ float: 'left' }}>
        {' '}
        Apply
      </button>
    </div>
  );
}

export default JobPosting;
