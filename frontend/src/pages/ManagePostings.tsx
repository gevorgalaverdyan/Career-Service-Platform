import React, { useEffect, useState } from 'react';
import './styles/JobPostingStyles.css';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Spinner from '../components/Spinner';
import { toast } from 'react-toastify';
import { IoCreateOutline } from 'react-icons/io5';
import { getJob } from '../features/jobs/jobsSlice';
import { Link } from 'react-router-dom';
import axios from 'axios';
const API_URL = '/job/';

function ManagePostings() {
  const dispatch: any = useDispatch();
  const navigate = useNavigate();

  const { job, isSuccess, isLoading, isError, message } = useSelector(
    (state: any) => state.jobs
  );

  const { jobId } = useParams();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    company: '',
    deadline: '',
  });

  const { title, description, company, deadline } = formData;

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    dispatch(getJob(jobId));
  }, [jobId, isError, message]);

  const onChange = (e: any) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();

    if (!title || !description || !company || !deadline) {
      toast.error('Missing Data');
    } else {
      const response = await axios.put(API_URL + jobId, formData);
      navigate('/employee-job-postings');
      toast.success('Job Updated');
      return response.data;
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className='heading'>
        <h1>
          <IoCreateOutline style={{ paddingTop: '10px' }} />
          Update Posting
        </h1>
      </section>

      <section className='form'>
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <label htmlFor='job_title'>
              Job Title
              <input
                type='text'
                name='title'
                className='form-control'
                id='job_title'
                placeholder='Enter the job title'
                value={formData.title}
                onChange={onChange}
                required
              />
            </label>
            <label htmlFor='job_description'>
              Job Description
              <textarea
                style={{ height: 150 }}
                className='Text-area'
                placeholder='Enter the job description'
                value={formData.description}
                onChange={onChange}
                name='description'
              />
            </label>
            <label htmlFor='company_name'>
              Company Name
              <input
                type='text'
                className='form-control'
                id='company_name'
                placeholder='Enter the company name'
                name='company'
                value={formData.company}
                onChange={onChange}
                required
              />
            </label>
            <label htmlFor='job_duedate'>
              Job Due Date
              <input
                type='date'
                className='form-control'
                min='2022-01-01'
                max='2024-12-31'
                value={formData.deadline}
                onChange={onChange}
                id='job_duedate'
                name='deadline'
                required
              />
            </label>
            <button className='btn btn-block' type='submit'>
              Edit and Save
            </button>
            <button
              className='btn btn-block'
              onClick={async () => {
                const res = await axios.delete(API_URL + jobId);
                navigate('/employee-job-postings');
                toast.success('Job DELETED');
                return res.data;
              }}
            >
              Delete Current Posting
            </button>
            <Link to={`/job-applicants/${jobId}`} className='btn'>
              View Applicants
            </Link>
          </div>
        </form>
      </section>
    </>
  );
}

export default ManagePostings;