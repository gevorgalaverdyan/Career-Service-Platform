import React, { useEffect } from 'react';
import { BsPeopleFill } from 'react-icons/bs';
import JobApplicantItem from '../components/JobApplicantItem';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

function JobApplicants() {
  const jobId = useParams();
  const dispatch: any = useDispatch();

  const { user } = useSelector((state: any) => state.auth);

  useEffect(() => {
    // if (isError) {
    //   toast.error(message);
    //   if (message === 'No token provided!') {
    //     toast.warn('LOGIN AGAIN');
    //     navigate('/login');
    //   }
    // }
    //dispatch(getApplicantsbyjobid())
  }, []);

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
        Applicants Board ({user.company})
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
        <JobApplicantItem />
      </div>
      <button
        onClick={async () => {
          const res = await axios.get(`/application/job/8`);
          const data = res.data;
          let applicantsID: any = [];
          data.map((application: any) => {
            const { userId } = application;
            applicantsID = [...applicantsID, userId];
          });
          console.log(data);
          console.log(applicantsID);
          const students = await axios.get(`/user-info/${applicantsID[0]}`);
          console.log(students);
        }}
      >
        Click
      </button>
    </>
  );
}

export default JobApplicants;
