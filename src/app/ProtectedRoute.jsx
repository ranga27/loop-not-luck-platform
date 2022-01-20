import React, { Suspense, lazy } from 'react';
import { useSelector } from 'react-redux';
import { CandidateRoute, CandidateOnboarding } from '../views/candidate';

const SuperAdminRoute = lazy(() =>
  import(/* webpackChunkName: "super-admin" */ '../views/super')
);

const CompanyRoute = lazy(() =>
  import(/* webpackChunkName: "company" */ '../views/company')
);
// TODO: implement redirect to unautorised
const getRoute = (user) => {
  const route = {
    super: <SuperAdminRoute />,
    candidate: user.isOnboarded ? <CandidateRoute /> : <CandidateOnboarding />,
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
