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

  //It initializes formData to an object with properties for the user's 
  //first name, last name, email, password, and confirm password.
  const [formData, setFormData] = useState({ //defining a setFormData function that can be used to update the state.
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  //* check for types TS
  
  const onChange = (e: any) => {
    setFormData({
      ...formData, // spread operator, reate a copy of the object and modify any of its properties without changing the original object.
      [e.target.name]: e.target.value, //new object that has the same properties as formData, but with a new value for the property that matches the name of the input field that triggered the function.
    });
  };
  
  const onSubmit = (e: any) => {
    e.preventDefault();
    // Do something with the formData object, like sending it to the server for validation
    console.log(formData);
  };
  
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
            <label htmlFor='passsword'>
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
