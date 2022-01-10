/* eslint-disable react/no-children-prop */
import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import UserLayout from '../../layout/UserLayout';

// TODO: Replace Loading in Suspense with a framer motion effect
const User = () => {
  return (
    <UserLayout>
      <AnimatePresence exitBeforeEnter>
        <Suspense fallback={<div className="loading" />}>
          <Outlet />
        </Suspense>
      </AnimatePresence>
    </UserLayout>
  );
};

export default User;
