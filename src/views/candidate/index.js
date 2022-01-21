/* eslint-disable react/no-children-prop */
import React, { Suspense } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import AppLayout from '../../layout/AppLayout';
import Account from './Account';
import Onboarding from './onboarding';
import ViewRoles from './ViewRoles';

const CandidateRoute = () => {
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

export default CandidateRoute;
