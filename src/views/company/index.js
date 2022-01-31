import React, { Suspense, lazy } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import AppLayout from '../../layout/AppLayout';

const Account = lazy(() =>
  import(/* webpackChunkName: "company-account" */ './Account')
);

const PostRole = lazy(() =>
  import(/* webpackChunkName: "company-post-role" */ './PostRole')
);
const CompanyRoute = () => {
  return (
    <AppLayout>
      <Suspense fallback={<div className="loading" />}>
        <Routes>
          <Route path="account" element={<Account />} />
          <Route path="post-role" element={<PostRole />} />
          <Route path="/" element={<Navigate to="account" />} />
        </Routes>
      </Suspense>
    </AppLayout>
  );
};

export default CompanyRoute;
