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

function Header() {
  const navigate = useNavigate();
  const dispatch: any = useDispatch();
  const { user } = useSelector((state: any) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/');
  };

  //this will be changed and put in REDUX
  const onUserProfile = () =>{
    navigate('/user-profile');
  }

  return (
    <header className='header'>
      <div className='logo'>
        <Link to={'/'}>CareersConcordia</Link>
      </div>
      <ul>
        {user ? (
          <>
            <li>
              <button className='btn' onClick={onUserProfile}>
                <FaUserCircle />
                {user?.firstName[0] +' '+ user?.lastName[0]}
              </button>
            </li>
            <li>
              <button className='btn' onClick={onLogout}>
                <FaSignOutAlt /> Logout
              </button>
            </li>
          </>
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