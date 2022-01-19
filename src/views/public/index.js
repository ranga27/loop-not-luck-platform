import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import PublicLayout from '../../layout/PublicLayout';
import Login from './login';
import Register from './Register';
import ForgotPassword from './forgot-password';
import Error from '../error';
import Unauthorised from '../unauthorised';

// TODO: Replace Loading in Suspense with a framer motion effect
const Public = () => {
  return (
    <PublicLayout>
      <AnimatePresence exitBeforeEnter>
        <Suspense fallback={<div className="loading" />}>
          <Routes>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route path="register" element={<Register />} />
            <Route path="error" element={<Error />} />
            <Route path="unauthorised" element={<Unauthorised />} />
            <Route path="*" element={<Error />} />
            <Route path="/" element={<Navigate to="login" />} />
          </Routes>
        </Suspense>
      </AnimatePresence>
    </PublicLayout>
  );
};

export default Public;
