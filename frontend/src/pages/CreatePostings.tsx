import React, { useEffect, useState } from 'react';
import './styles/JobPostingStyles.css';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner';
import { toast } from 'react-toastify';
import { IoCreateOutline } from 'react-icons/io5';
import { Job } from '../common/types';
import { createJob, reset } from '../features/jobs/jobsSlice';

function CreatePostings() {
  const [formData, setFormData] = useState<Job>({
    title: '',
    description: '',
    company: '',
    deadline: formatDate(new Date()),
    address:'',
  });

  const { title, description, company, deadline, address } = formData;

  const { isSuccess, isLoading, isError, message } = useSelector(
    (state: any) => state.jobs
  );

  const dispatch: any = useDispatch();
  const navigate = useNavigate();

  const onChange = (e: any) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    
    dispatch(reset());
  }, [isError, message, isSuccess, navigate, dispatch]);

  const onSubmit = (e: any) => {
    e.preventDefault();

    if (!title || !description || !company || !deadline || !address) {
      toast.error('Missing Data');
    } else {
      dispatch(createJob(formData))
        .then(() => {
          navigate('/');
          toast.success('New Job created!');
        })
        .catch(toast.error);
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
          Create Postings
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
                value={title}
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
                value={description}
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
                value={company}
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
                value={deadline}
                onChange={onChange}
                id='job_duedate'
                name='deadline'
                required
              />
            </label>
            <label htmlFor="address">
              Address
              <input 
              type='text'
              className='form-control'
              id='address'
              placeholder='Enter the location of the job'
              name='address'
              value={address}
              onChange={onChange}
              required
              />
            </label>
            <button className='btn btn-block'>Submit</button>
          </div>
        </form>
      </section>
    </>
  );
}

function formatDate(date: Date) {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
}

export default CreatePostings;
