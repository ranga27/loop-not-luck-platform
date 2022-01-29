import React, { Suspense, lazy } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import AppLayout from '../../layout/AppLayout';

const Onboarding = lazy(() =>
  import(/* webpackChunkName: "company-onboarding" */ './Onboarding')
);

const PostRole = lazy(() =>
  import(/* webpackChunkName: "company-post-role" */ './PostRole')
);
const CompanyRoute = () => {
  return (
    <AppLayout>
      <Suspense fallback={<div className="loading" />}>
        <Routes>
          <Route path="account" element={<Onboarding />} />
          <Route path="post-role" element={<PostRole />} />
          <Route path="/" element={<Navigate to="account" />} />
        </Routes>
      </Suspense>
    </AppLayout>
  );
};

export default CompanyRoute;
