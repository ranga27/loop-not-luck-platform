/* eslint-disable react/no-children-prop */
import React, { Suspense, lazy } from 'react';
import { useQuery } from 'react-query';
import { Route, Routes, Navigate } from 'react-router-dom';
import AppLayout from '../../layout/AppLayout';

const Account = lazy(() =>
  import(/* webpackChunkName: "candidate-account" */ './Account')
);

const Logout = lazy(() =>
  import(/* webpackChunkName: "candidate-logout" */ './Logout')
);
const ViewRoles = lazy(() =>
  import(/* webpackChunkName: "candidate-roles" */ './ViewRoles')
);
const SavedRoles = lazy(() =>
  import(/* webpackChunkName: "candidate-saved-roles" */ './SavedRoles')
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
            <Route path="saved" element={<SavedRoles />} />
            <Route path="account" element={<Account />} />
            <Route path="logout" element={<Logout />} />
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
  const userDoc = useQuery('userDoc');
  if (userDoc.isLoading) {
    return <div className="loading" />;
  }

  if (!userDoc.data.isOnboarded) return <CandidateOnboarding />;
  return <CandidateApp />;
};

export default CandidateRoute;
