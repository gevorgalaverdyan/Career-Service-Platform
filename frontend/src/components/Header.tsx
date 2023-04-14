import React from 'react';
import {
  FaSignInAlt,
  FaSignOutAlt,
  FaUser,
  FaUserCircle,
} from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../features/auth/authSlice';
import { GiCompass } from 'react-icons/gi';
import { BsFillBriefcaseFill } from 'react-icons/bs';
import './header.css';

function Header() {
  const navigate = useNavigate();
  const dispatch: any = useDispatch();
  const { user } = useSelector((state: any) => state.auth);
  let isEmployer = null;
  let isStudent = null;

  if (user) {
    const roles = user.roles.map((role: any) =>
      role.split('_')[1].toLowerCase()
    );

    isEmployer = roles.find((role: any) => role === 'employer') != null;
    isStudent = roles.find((role: any) => role === 'student') != null;
  }

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/');
  };

  //this will be changed and put in REDUX
  const onUserProfile = () => {
    navigate('/user-profile');
  };

  const onCreateJobs = () => {
    navigate('/create-postings');
  };

  const onViewJobs = () => {
    navigate('/job-postings');
  }

  return (
    <header className='header'>
      <div className='logo'>
        <Link to={'/'} className='title'>
          <GiCompass size={30} className='icon' />
          CareersConcordia
        </Link>
      </div>
      <ul>
        {user ? (
          <div className='btnCollection'>
            {isEmployer && (
              <button className='btn' onClick={onCreateJobs}>
                <BsFillBriefcaseFill size={20} />
                Create Jobs
              </button>
            )}
            {isStudent && (
              <button className='btn' onClick={onViewJobs}>
                <BsFillBriefcaseFill size={20} />
                Postings
              </button>
            )}
            <li>
              <button className='btn' onClick={onUserProfile}>
                <FaUserCircle />
                {user?.firstName[0] + ' ' + user?.lastName[0]}
              </button>
            </li>
            <li>
              <button className='btn' onClick={onLogout}>
                <FaSignOutAlt /> Logout
              </button>
            </li>
          </div>
        ) : (
          <>
            <li>
              <Link to={'/login'}>
                <FaSignInAlt /> Login
              </Link>
            </li>
            <li>
              <Link to={'/register'}>
                <FaUser /> Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  );
}

export default Header;
