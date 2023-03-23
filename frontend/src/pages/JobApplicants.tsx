import React, {useEffect} from 'react';
import {BsPeopleFill} from 'react-icons/bs'
import JobApplicantItem from '../components/JobApplicantItem';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

function JobApplicants() {
  const jobId = useParams();
  const dispatch:any = useDispatch();

  useEffect(() => {
    // if (isError) {
    //   toast.error(message);
    //   if (message === 'No token provided!') {
    //     toast.warn('LOGIN AGAIN');
    //     navigate('/login');
    //   }
    // }

    //dispatch(getApplicantsbyjobid())
  }, [])
  
  return (
    <>
      <h1
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <BsPeopleFill />
        <pre> </pre>
        Applicants Board (company)
      </h1>
      <div className='tickets'>
        <div className='ticket-headings'>
          <div>Job Title</div>
          <div>Deadline</div>
          <div>Resume(CV)</div>
          {/*Link to CV*/}
          <div>Recruit</div>
        </div>
        {/* {'MAP'} */}
        <JobApplicantItem/>
      </div>
    </>
  );
}

export default JobApplicants;
