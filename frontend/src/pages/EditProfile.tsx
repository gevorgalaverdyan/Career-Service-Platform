import React, { useState, useEffect } from 'react';
import { FaUser } from 'react-icons/fa';
import './styles/userTypeStyles.css';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';

function EditProfile() {
  const { user, isLoading, isSuccess, message, isError } = useSelector(
    (state: any) => state.auth
  );

  //usestate

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
  }, [user, isSuccess, message, isError]);

  if (isLoading) {
    return <Spinner />;
  }

  //* check for types TS
  //onchange
  //onsubmit "const user {}""

  return (
    <>
      <section className='heading'>
        <h1>
          <FaUser />
          Edit Profile
        </h1>
      </section>

      <section className='form'>
        <form /*onSubmit={onSubmit}*/>
          <div className='form-group'>
            <label htmlFor='first_name'>
              First Name
              <input
                type='text'
                className='form-control'
                id='first_name'
                placeholder='Enter your name'
                name='firstName'
                // value={first} [*first, setfirst]
                // onChange={(e)=>{setfirst(e.text)})}
                required
              />
            </label>
            <label htmlFor='last_name'>
              Last Name
              <input
                type='text'
                className='form-control'
                id='last_name'
                placeholder='Enter your name'
                name='lastName'
                required
              />
            </label>
            <label htmlFor='email'>
              Email
              <input
                type='email'
                className='form-control'
                id='email'
                placeholder='abc@gmail.com'
                name='email'
                required
              />
            </label>
            <label htmlFor='passsword'>
              Password
              <input
                type='password'
                name='password'
                id='password'
                className='form-control'
                placeholder='Password'
                required
              />
            </label>
            <label htmlFor='confirm_password'>
              Confirm Password
              <input
                type='password'
                name='confirm_password'
                id='confirm_password'
                className='form-control'
                placeholder='Confirm Password'
                required
              />
            </label>

            <label>Resume</label>
            <input type='file' accept='.pdf,.doc,.docx' />
            <label>Cover Letter</label>
            <input type='file' accept='.pdf,.doc,.docx' />
            <label>Transcript</label>
            <input type='file' accept='.pdf,.doc,.docx' />
          </div>
          <div>
            <div className='form-group'>
              <button className='btn btn-block'>Save Changes</button>
            </div>
          </div>
        </form>
      </section>
    </>
  );
}

export default EditProfile;
