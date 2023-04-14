import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useUserRole } from '../hooks/useUserRole';
import Spinner from './Spinner';
import { USER_ROLE } from '../common/types';

/**
 * 
 * @param {string} role  - role of the user
 * @param {boolean} isLoggedIn - signed in
 * @returns {boolean} if logged in and a company
 */
const isRoleCompany = (isLoggedIn: boolean, role: string) => {
  if (isLoggedIn && (role === USER_ROLE.ADMIN || role === USER_ROLE.EMPLOYER)) {
    return true;
  }else{
    return false;
  }
};

function CompanyRoute() {
  const { loggedIn, userRole, checkingStatus } = useUserRole();

  if (checkingStatus) {
    return <Spinner />;
  }

  return isRoleCompany(loggedIn, userRole) ? <Outlet /> : <Navigate to={'/'} />;
}

export default CompanyRoute;
