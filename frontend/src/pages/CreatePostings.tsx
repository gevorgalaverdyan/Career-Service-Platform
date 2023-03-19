import React, { useEffect } from 'react';
import './styles/CreatePostings.css';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Spinner from '../components/Spinner';
import { toast } from 'react-toastify';
import { getJob } from '../features/jobs/jobsSlice';

function CreatePostings() {
  return (
    <>
      <section className='heading'>
        <h1>Create Postings</h1>
      </section>

      <section className='form'>
        <div className='form-group'>
            <label htmlFor='job_title'>
                Job Title
                <input 
                    type='text'
                    className='form-control'
                    id='job_title'
                    placeholder='Enter the job title'
                    name='jobtitle'
                    required
                />
            </label>
            <label htmlFor='job_description'>
                Job Description
                <textarea className='Text-area'></textarea>
            </label>
            <label htmlFor='company_name'>
                Company Name
                <input 
                    type='text'
                    className='form-control'
                    id='company_name'
                    placeholder='Enter the company name'
                    name='companyname'
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
                    //value='---------'
                    id='job_duedate'
                    name='duedate'
                    required
                />
            </label>
        </div>
        <div>
            <div className='form-group'>
              <button className='btn btn-block'>Submit</button>
            </div>
          </div>
      </section>
    </>
  );
}

export default CreatePostings;
