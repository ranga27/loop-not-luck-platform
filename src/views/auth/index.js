import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import AuthLayout from '../../layout/UserLayout';

// TODO: Replace Loading in Suspense with a framer motion effect
const Auth = () => {
  return (
    <AuthLayout>
      <AnimatePresence exitBeforeEnter>
        <Suspense fallback={<div className="loading" />}>
          <Outlet />
        </Suspense>
      </AnimatePresence>
    </AuthLayout>
  );
};

export default Auth;
