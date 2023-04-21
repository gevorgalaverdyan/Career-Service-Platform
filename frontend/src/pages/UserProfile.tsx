import React, { useEffect, useRef } from 'react';
import { FaUser } from 'react-icons/fa';
import './styles/userTypeStyles.css';
import './styles/userProfileStyles.css';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';
import { ref, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase.config';

function UserProfile() {
  const { user, isLoading, isSuccess, message, isError } = useSelector(
    (state: any) => state.auth
  );

  const userRoles = user.roles.map((role: any) =>
    role.split('_')[1].toLowerCase()
  );

  const isStudent = userRoles.find((role: any) => role === 'student') != null;
  const isEmployer = userRoles.find((role: any) => role === 'employer') != null;

  const starsRef = ref(storage, `files/${user.userId}_CV.pdf`);

  const linkRef: any = useRef();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    isStudent &&
      getDownloadURL(starsRef)
        .then((url) => {
          linkRef.current.href = url;
        })
        .catch((error) => {
          console.log(error);
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, isSuccess, message, isError]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className='heading'>
        <h1>
          <FaUser />
          User Profile
        </h1>
      </section>
      <div className='profile-info'>
        <h2>Information</h2>
        <table>
          <tbody>
            <tr>
              <td className='fields'>First Name</td>
              <td>{user.firstName}</td>
            </tr>
            <tr>
              <td className='fields'>Last Name</td>
              <td>{user.lastName}</td>
            </tr>
            <tr>
              <td className='fields'>Email</td>
              <td>{user.email}</td>
            </tr>
            {isStudent && (
              <tr>
                <td className='fields'>Resume</td>
                <td>
                  <a className='links' ref={linkRef} download>
                    Download Resume
                  </a>
                </td>
              </tr>
            )}
            {isEmployer && (
              <tr>
                <td className='fields'>Company Name</td>
                <td>{user.company}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Link className='profile-button' to={'/edit-profile'}>
          Edit Profile
        </Link>
        {isStudent && (
          <Link className='profile-button' to={'/user-applications'}>
            My Applications
          </Link>
        )}
        {isEmployer && (
          <Link className='profile-button' to={'/employee-job-postings'}>
            My Jobs
          </Link>
        )}
      </div>
    </>
  );
}

export default UserProfile;
