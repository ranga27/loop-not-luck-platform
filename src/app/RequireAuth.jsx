const React = require('react');
const { useSelector } = require('react-redux');
const { useLocation, Navigate, Outlet } = require('react-router-dom');

const RequireAuth = () => {
  const { currentUser } = useSelector((state) => state.authUser);
  const location = useLocation();

  if (currentUser) {
    return <Outlet />;
  }
  return <Navigate to="/login" state={{ from: location }} />;
};

export default RequireAuth;
