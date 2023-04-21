import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useUserRole } from '../hooks/useUserRole';
import Spinner from './Spinner';
import { USER_ROLE } from '../common/types';

/**
 *
 * @param {string} role  - role of the user
 * @param {boolean} isLoggedIn - signed in
 * @returns {boolean} if logged in and a student
 */
const isRoleStudent = (isLoggedIn: boolean, role: string) => {
  if (isLoggedIn && (role === USER_ROLE.ADMIN || role === USER_ROLE.STUDENT)) {
    return true;
  } else {
    return false;
  }
};

export default function StudentRoute() {
  const { loggedIn, userRole, checkingStatus } = useUserRole();

  if (checkingStatus) {
    return <Spinner />;
  }

  return isRoleStudent(loggedIn, userRole) ? <Outlet /> : <Navigate to={'/'} />;
}

