import React, { useState, useEffect } from 'react';
import { FaUser } from 'react-icons/fa';
import './styles/userTypeStyles.css';
import './styles/userProfileStyles.css';
import { Link } from 'react-router-dom';

function UserProfile() {
  return (
    <>
      <section className='heading'>
        <h1>
          <FaUser />
          User Profile
        </h1>
      </section>
      <div className='profile-info'>
        <h2>Student Info</h2>
        <table>
          <tbody>
            <tr>
              <td>First Name</td>
              <td>John</td>
            </tr>
            <tr>
              <td>Last Name</td>
              <td>Doe</td>
            </tr>
            <tr>
              <td>Email</td>
              <td>johndoe@example.com</td>
            </tr>
            <tr>
              <td>Password:</td>
              <td>*********</td>
            </tr>
          </tbody>
        </table>

        <h2 className='documents-heading'>Documents</h2>
        <table>
          <thead>
            <tr>
              <th>Document Type</th>
              <th>Download Link</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Resume</td>
              <td>
                <a className='links' href='path/to/resume.pdf' download>
                  Download Resume
                </a>
              </td>
            </tr>
            <tr>
              <td>Cover Letter</td>
              <td>
                <a className='links' href='path/to/cover_letter.pdf' download>
                  Download Cover Letter
                </a>
              </td>
            </tr>
            <tr>
              <td>Transcript</td>
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
