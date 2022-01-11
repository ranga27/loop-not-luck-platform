const React = require('react');
const { useSelector } = require('react-redux');
const { useLocation, Navigate, Outlet } = require('react-router-dom');

const RequireAuth = () => {
  const { currentUser } = useSelector((state) => state.auth);
  const location = useLocation();

  if (!currentUser) {
    return <Navigate to="/login" state={{ from: location }} />;
  }
  return <Outlet />;
};

export default RequireAuth;
