import { useAuthUser } from '@react-query-firebase/auth';
import { auth } from '../helpers/Firebase';

const React = require('react');
const { useLocation, Navigate, Outlet } = require('react-router-dom');

const RequireAuth = () => {
  const userAuth = useAuthUser(['userAuth'], auth);
  const location = useLocation();
  if (userAuth.isLoading) {
    return <div className="loading" />;
  }
  if (userAuth.data) {
    return <Outlet />;
  }
  return <Navigate to="/login" state={{ from: location }} />;
};

export default RequireAuth;
