/* eslint-disable react/no-children-prop */
import React, { Suspense } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import AppLayout from '../../layout/AppLayout';
import Account from './Account';
import ViewRoles from './roles/ViewRoles';

const CandidateRoute = () => {
  return (
    <AppLayout>
      <div className="dashboard-wrapper">
        <Suspense fallback={<div className="loading" />}>
          <Routes>
            <Route path="roles" element={<ViewRoles />} />
            <Route path="account" element={<Account />} />
            <Route path="/" element={<Navigate to="roles" />} />
          </Routes>{' '}
        </Suspense>
      </div>
    </AppLayout>
  );
};

export default CandidateRoute;
