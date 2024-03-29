import React, { useEffect } from 'react';
import { BsPeopleFill } from 'react-icons/bs';
import JobApplicantItem from '../components/JobApplicantItem';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getApplicantsByJobId } from '../features/applicant/applicantsSlice'
import { Student } from '../common/types';

function JobApplicants() {

  const { jobId } = useParams();
  const dispatch: any = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state: any) => state.auth);

  const { applicants, isError, message } = useSelector(
    (state: any) => state.applicants
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
      if (message === 'No token provided!') {
        toast.warn('LOGIN AGAIN');
        navigate('/login');
      }
    }

    if (jobId) {
      dispatch(getApplicantsByJobId(jobId));
    }
  }, [isError, message, dispatch, navigate]);

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
          <div>Name</div>
          <div>Status</div>
          <div>Resume(CV)</div>
          <div>Recruit</div>
        </div>
        {applicants.map((applicant: Student) => (
          <JobApplicantItem
            name={applicant.firstName + ' ' + applicant.lastName}
            status={applicant.status}
            userId={applicant.userId}
            key={applicant._id}
            applicationId={applicant.applicationId}
          />
        ))}
      </div>
    </>
  );
}

export default JobApplicants;
