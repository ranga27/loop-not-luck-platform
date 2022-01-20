/* eslint-disable react/no-children-prop */
import React, { Suspense, lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import AppLayout from '../../layout/AppLayout';

const EditUsers = lazy(() =>
  import(/* webpackChunkName: "admin-users" */ './EditUsers')
);

const Test = lazy(() => import(/* webpackChunkName: "admin-test" */ './Test'));

const SuperAdminRoute = () => {
  return (
    <AppLayout>
      <Suspense fallback={<div className="loading" />}>
        <Routes>
          <Route path="test" element={<Test />} />
          <Route path="users" element={<EditUsers />} />
          <Route path="/" element={<Navigate to="test" />} />
        </Routes>
      </Suspense>
    </AppLayout>
  );
};
export default SuperAdminRoute;
