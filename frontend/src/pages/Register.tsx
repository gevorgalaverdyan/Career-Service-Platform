import React, { useState, useEffect } from 'react';
import { FaUser } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { register, reset } from '../features/auth/authSlice';
import Spinner from '../components/Spinner';
import './styles/userTypeStyles.css';

function Register() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    password2: '',
    userType: 'student',
    company: '',
  });

  const navigate = useNavigate();

  const { firstName, lastName, email, password, password2, userType, company } =
    formData;

  const dispatch: any = useDispatch();

  const { user, isLoading, isSuccess, message, isError } = useSelector(
    (state: any) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      navigate('/');
    }

    dispatch(reset());
  }, [isError, isSuccess, user, message, navigate, dispatch]);

  const onChange = (e: any) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e: any) => {
    e.preventDefault();

    if (password !== password2) {
      toast.error('Passwords must match');
    } else {
      const userData = {
        firstName,
        lastName,
        email,
        roles: [userType],
        password,
      };

      dispatch(register(userData));
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

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
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            {userType === 'employer' && (
              <input
                type='text'
                name='company'
                id='company'
                className='form-control'
                value={company}
                onChange={onChange}
                placeholder='Company Name'
                required
              />
            )}
            <input
              type='text'
              className='form-control'
              id='firstName'
              value={firstName}
              onChange={onChange}
              placeholder='Enter your first name'
              name='firstName'
              required
            />
            <input
              type='text'
              className='form-control'
              id='lastName'
              value={lastName}
              onChange={onChange}
              placeholder='Enter your last name'
              name='lastName'
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
                checked={userType === 'employer'}
                value={'employer'}
                onChange={onChange}
              />

              <label htmlFor='option-1' className='option option-1'>
                <div className='dot'></div>
                <span>Student</span>
              </label>

              <label htmlFor='option-2' className='option option-2'>
                <div className='dot'></div>
                <span>Employer</span>
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
