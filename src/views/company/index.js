import React, { Suspense, lazy } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import AppLayout from '../../layout/AppLayout';

const Onboarding = lazy(() =>
  import(/* webpackChunkName: "company-onboarding" */ './Onboarding')
);

const CompanyRoute = () => {
  return (
    <AppLayout>
      <Suspense fallback={<div className="loading" />}>
        <Routes>
          <Route path="onboard" element={<Onboarding />} />
          <Route path="/" element={<Navigate to="onboard" />} />
        </Routes>
      </Suspense>
    </AppLayout>
  );
};

export default CompanyRoute;
