import React, { Suspense, lazy } from 'react';
import { useSelector } from 'react-redux';

const SuperAdminRoute = lazy(() =>
  import(/* webpackChunkName: "super-admin" */ '../views/super')
);

const CandidateRoute = lazy(() =>
  import(/* webpackChunkName: "super-admin" */ '../views/candidate')
);

const CompanyRoute = lazy(() =>
  import(/* webpackChunkName: "company" */ '../views/company')
);
// TODO: implement redirect to unautorised
const getRoute = (user) => {
  const route = {
    super: <SuperAdminRoute />,
    candidate: <CandidateRoute />,
    employer: <CompanyRoute />,
  };
  return route[user.role];
};

const ProtectedRoute = () => {
  const { currentUser } = useSelector((state) => state.auth);
  return (
    <Suspense fallback={<div className="loading" />}>
      {getRoute(currentUser)}
    </Suspense>
  );
};

export default ProtectedRoute;
