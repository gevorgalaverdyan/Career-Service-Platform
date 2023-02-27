import React, { useState, useEffect } from 'react';
import { FaUser } from 'react-icons/fa';
import { toast } from 'react-toastify';
import './styles/userTypeStyles.css';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
    userType: 'student',
  });

  const { name, email, password, password2, userType } = formData;

  const onChange = (e: any) => {
    console.log(e.target.value)
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <>
      <section className='heading'>
        <h1>
          <FaUser />
          Register
        </h1>
        <p>Please create an account</p>
      </section>

      <section className='form'>
        <form /*onSubmit={onSubmit}*/>
          <div className='form-group'>
            <input
              type='text'
              className='form-control'
              id='name'
              value={name}
              onChange={onChange}
              placeholder='Enter your name'
              name='name'
              required
            />
            <input
              type='email'
              className='form-control'
              id='email'
              value={email}
              onChange={onChange}
              placeholder='abc@gmail.com'
              name='email'
              required
            />
            <input
              type='password'
              name='password'
              id='password'
              className='form-control'
              value={password}
              onChange={onChange}
              placeholder='Password'
              required
            />
            <input
              type='password'
              name='password2'
              id='password2'
              className='form-control'
              value={password2}
              onChange={onChange}
              placeholder='Confirm password'
              required
            />

            <div className='wrapper'>
              <input
                type='radio'
                name='userType'
                id='option-1'
                checked={userType === 'student'}
                value={'student'}
                onChange={onChange}
              />
              <input
                type='radio'
                name='userType'
                id='option-2'
                checked={userType === 'recruiter'}
                value={'recruiter'}
                onChange={onChange}
              />

              <label htmlFor='option-1' className='option option-1'>
                <div className='dot'></div>
                <span>Student</span>
              </label>

              <label htmlFor='option-2' className='option option-2'>
                <div className='dot'></div>
                <span>Recruiter</span>
              </label>
            </div>
          </div>

          <div className='form-group'>
            <button className='btn btn-block'>Submit</button>
          </div>
        </form>
      </section>
    </>
  );
}

export default Register;
