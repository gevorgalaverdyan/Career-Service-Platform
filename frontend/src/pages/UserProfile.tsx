import React, { useEffect } from 'react';
import { FaUser } from 'react-icons/fa';
import './styles/userTypeStyles.css';
import './styles/userProfileStyles.css';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';

function UserProfile() {
  const { user, isLoading, isSuccess, message, isError } = useSelector(
    (state: any) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
  }, [user, isSuccess, message, isError]);

  if (isLoading) {
    return <Spinner />;
  }

  const userRoles = user.roles.map((role: any) =>
    role.split('_')[1].toLowerCase()
  );

  const isStudent = userRoles.find((role: any) => role === 'student') != null;
  const isEmployer = userRoles.find((role: any) => role === 'employer') != null;

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
                  <a className='links' href='path/to/resume.pdf' download>
                    Download Resume
                  </a>
                </td>
              </tr>
            )}
            {isEmployer && (
              <tr>
                <td className='fields'>Company Name</td>
                <td>{user.companyName}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div>
        <div>
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
              <Link className='profile-button' to={'/'}>
                My Jobs
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default UserProfile;
