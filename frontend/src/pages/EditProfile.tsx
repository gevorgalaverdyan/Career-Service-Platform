import React, { useState, useEffect } from 'react';
import { FaUser } from 'react-icons/fa';
import './styles/userTypeStyles.css';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';
import { update, reset } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

function EditProfile() {
  const navigate = useNavigate();
  const dispatch: any = useDispatch();

  const { user, isLoading, isSuccess, message, isError } = useSelector(
    (state: any) => state.auth
  );

  const [formData, setFormData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    password: '',
    confirmPassword: '',
  });

  const { firstName, lastName, email, password, confirmPassword } = formData;

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess) {
      navigate('/user-profile');
    }

    dispatch(reset());
    //same as login dispatch
  }, [user, isSuccess, message, isError, navigate, dispatch]);

  //* check for types TS

  const onChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    try {
      if (!user) {
        throw Error('No User | Not signed in');
      }

      const _id = user?._id;
      const userData = { firstName, lastName, email, _id };

      dispatch(update(userData));
    } catch (error: any) {
      toast.error(error.message);
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
          Edit Profile
        </h1>
      </section>

      <section className='form'>
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <label htmlFor='first_name'>
              First Name
              <input
                type='text'
                className='form-control'
                id='first_name'
                placeholder='Enter your name'
                name='firstName'
                value={formData.firstName}
                onChange={onChange}
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
                value={formData.lastName}
                onChange={onChange}
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
                value={formData.email}
                onChange={onChange}
                required
              />
            </label>
            {/* <label htmlFor='passsword'>
              Password
              <input
                type='password'
                name='password'
                id='password'
                className='form-control'
                placeholder='Password'
                value={formData.password}
                onChange={onChange}
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
                value={formData.confirmPassword}
                onChange={onChange}
                required
              />
            </label> */}

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
