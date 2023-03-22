import axios from 'axios';
import React, { useEffect } from 'react';
import { GrStatusGoodSmall } from 'react-icons/gr';
import { MdWork } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ApplicationItem from '../components/ApplicationItem';
import Spinner from '../components/Spinner';
import { toast } from 'react-toastify';
import { getAppilicationForUser } from '../features/application/applicationSlice';

function UserApplications() {
  const { applications, isLoading, isError, message } = useSelector(
    (state: any) => state.applications
  );

  const { user } = useSelector((state: any) => state.auth);

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

    dispatch(getAppilicationForUser(user.userId));
  }, [isError, message, dispatch, navigate]);

  if (isLoading || !applications) {
    return <Spinner />;
  }

  return (
    <>
      <h1
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <MdWork />
        My Applications
      </h1>
      <div className='tickets'>
        <div className='ticket-headings'>
          <div>Job Title</div>
          <div>Company</div>
          <div>Deadline</div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            Status
            <GrStatusGoodSmall style={{ color: 'green', marginLeft: '5px' }} />
          </div>
        </div>
        {applications.map((application: any) => (
          <ApplicationItem
            title={application.title}
            status={application.status}
            company={application.company}
            deadline={application.deadline}
            key={application.jobId}
          />
        ))}
      </div>
    </>
  );
}

export default UserApplications;
