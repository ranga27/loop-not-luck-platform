import React, { useEffect } from 'react';
import { useAuthSignOut } from '@react-query-firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../helpers/Firebase';

const Logout = () => {
  const mutation = useAuthSignOut(auth);
  const navigate = useNavigate();

  const handleLogout = () => {
    try {
      mutation.mutate();
      navigate('/login');
    } catch (e) {
      throw new Error('Error while signing out');
    }
  };

  useEffect(() => {
    handleLogout();
  });
  return <div />;
};

export default Logout;
