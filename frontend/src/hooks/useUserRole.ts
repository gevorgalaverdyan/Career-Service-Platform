import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { USER_ROLE } from '../common/types';

export const useUserRole = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('');
  const [checkingStatus, setCheckingStatus] = useState(true);

  const { user } = useSelector((state: any) => state.auth);

  useEffect(() => {
    if (user) {
      setLoggedIn(true);

      const roles = user.roles.map((role: any) =>
        role.split('_')[1].toLowerCase()
      );
      //@desc check the role and set it, if invalid role set to other
      if (roles.find((role: any) => role === USER_ROLE.STUDENT) != null) {
        setUserRole(USER_ROLE.STUDENT);
      } else if (
        roles.find((role: any) => role === USER_ROLE.EMPLOYER) != null
      ) {
        setUserRole(USER_ROLE.EMPLOYER);
      } else if (roles.find((role: any) => role === USER_ROLE.ADMIN) != null) {
        setUserRole(USER_ROLE.ADMIN);
      } else {
        setUserRole(USER_ROLE.OTHER);
      }
    } else {
      setLoggedIn(false);
    }

    setCheckingStatus(false);
  }, [user]);

  return { loggedIn, userRole, checkingStatus };
};
