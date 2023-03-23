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
    resume: '',
    companyName: user.companyName,
  });

  const {
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    resume,
    companyName,
  } = formData;

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    dispatch(reset());
  }, [user, isSuccess, message, isError, navigate, dispatch]);

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
      let userData;
      // const userData = { firstName, lastName, email, _id };
      if (isEmployer) {
        userData = { firstName, lastName, email, _id, companyName };
      } else if (isStudent) {
        userData = { firstName, lastName, email, _id, resume };
      }
      else {
        toast.error("UserTypeError");
        return;
      }
        

      navigate('/user-profile');
      dispatch(update(userData));
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const userRoles = user.roles.map((role: any) =>
    role.split('_')[1].toLowerCase()
  );

  const isStudent = userRoles.find((role: any) => role === 'student') != null;
  const isEmployer = userRoles.find((role: any) => role === 'employer') != null;

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
            {isStudent && (
              <label>
                Resume
                <input type='file' name='resume' onChange={onChange} />
              </label>
            )}
            {isEmployer && (
              <label htmlFor='company_name'>
                Company Name
                <input
                  type='text'
                  className='form-control'
                  id='company_name'
                  placeholder='Enter your company name'
                  name='companyName'
                  value={formData.companyName}
                  onChange={onChange}
                />
              </label>
            )}
            <button type='submit' className='btn btn-primary'>
              Save
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default EditProfile;
