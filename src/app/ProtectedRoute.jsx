import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AppLayout from '../layout/AppLayout';
import ViewRoles from '../views/candidate/roles/ViewRoles';
import Account from '../views/candidate/Account';
import EditUsers from '../views/super/Users';
import Test from '../views/super/Test';

// TODO: onboarding flow missing
const getRoute = (user) => {
  const route = {
    super: <SuperRoute />,
    candidate: <CandidateRoute />,
  };
  return route[user.role];
};

const ProtectedRoute = () => {
  const { currentUser } = useSelector((state) => state.authUser);
  return (
    <AppLayout>
      <Suspense fallback={<div className="loading" />}>
        {getRoute(currentUser)}
      </Suspense>
    </AppLayout>
  );
};

export default ProtectedRoute;

const CandidateRoute = () => {
  return (
    <Routes>
      <Route path="roles" element={<ViewRoles />} />
      <Route path="account" element={<Account />} />
      <Route path="/" element={<Navigate to="roles" />} />
    </Routes>
  );
};

const SuperRoute = () => {
  return (
    <Routes>
      <Route path="test" element={<Test />} />
      <Route path="users" element={<EditUsers />} />
      <Route path="/" element={<Navigate to="test" />} />
    </Routes>
  );
};
