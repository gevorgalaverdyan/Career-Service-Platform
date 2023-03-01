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
          </tbody>
        </table>

        <h2 className='documents-heading'>Documents</h2>
        <table>
          <tbody>
            <tr>
              <td className='fields'>Resume</td>
              <td>
                <a className='links' href='path/to/resume.pdf' download>
                  Download Resume
                </a>
              </td>
            </tr>
            <tr>
              <td className='fields'>Cover Letter</td>
              <td>
                <a className='links' href='path/to/cover_letter.pdf' download>
                  Download Cover Letter
                </a>
              </td>
            </tr>
            <tr>
              <td className='fields'>Transcript</td>
              <td>
                <a className='links' href='path/to/transcript.pdf' download>
                  Download Transcript
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Link className='profile-button' to='/edit-profile'>
              Edit Profile
            </Link>
            <button className='profile-button'>
              Applications / Interviews
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserProfile;
