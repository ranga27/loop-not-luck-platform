/* eslint-disable react/no-children-prop */
import React, { Suspense, lazy } from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes, Navigate } from 'react-router-dom';
import AppLayout from '../../layout/AppLayout';

const Account = lazy(() =>
  import(/* webpackChunkName: "candidate-account" */ './Account')
);

const ViewRoles = lazy(() =>
  import(/* webpackChunkName: "candidate-roles" */ './ViewRoles')
);

const Onboarding = lazy(() =>
  import(/* webpackChunkName: "candidate-onboarding" */ './onboarding')
);

const CandidateApp = () => {
  return (
    <AppLayout>
      <div className="dashboard-wrapper">
        <Suspense fallback={<div className="loading" />}>
          <Routes>
            <Route path="roles" element={<ViewRoles />} />
            <Route path="account" element={<Account />} />
            <Route path="/" element={<Navigate to="roles" />} />
          </Routes>
        </Suspense>
      </div>
    </AppLayout>
  );
};
const CandidateOnboarding = () => {
  return (
    <Routes>
      <Route path="onboard" element={<Onboarding />} />
      <Route path="/" element={<Navigate to="onboard" />} />
    </Routes>
  );
};

const CandidateRoute = () => {
  const { currentUser } = useSelector((state) => state.auth);
  if (!currentUser.isOnboarded) return <CandidateOnboarding />;
  return <CandidateApp />;
};

export default CandidateRoute;
