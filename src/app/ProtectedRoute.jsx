import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AppLayout from '../layout/AppLayout';
import EditUsers from '../views/super/Users';
import Test from '../views/super/Test';
import { CandidateRoute, CandidateOnboarding } from '../views/candidate';

// TODO: implement redirect to unautorised
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
