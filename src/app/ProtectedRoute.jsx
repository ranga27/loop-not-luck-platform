import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AppLayout from '../layout/AppLayout';
import Onboarding from '../views/candidate/onboarding';
import EditUsers from '../views/super/Users';
import Test from '../views/super/Test';
import CandidateRoute from '../views/candidate';

// TODO: onboarding flow missing
const getRoute = (user) => {
  const route = {
    super: <SuperRoute />,
    candidate: user.isOnboarded ? <CandidateRoute /> : <CandidateOnboarding />,
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

const CandidateOnboarding = () => {
  return (
    <Routes>
      <Route path="onboard" element={<Onboarding />} />
      <Route path="/" element={<Navigate to="onboard" />} />
    </Routes>
  );
};

const SuperRoute = () => {
  return (
    <AppLayout>
      <Routes>
        <Route path="test" element={<Test />} />
        <Route path="users" element={<EditUsers />} />
        <Route path="/" element={<Navigate to="test" />} />
      </Routes>
    </AppLayout>
  );
};
