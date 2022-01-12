import React, { Suspense, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// TODO: Replace Loading in Suspense with a framer motion effect
const Public = () => {
  useEffect(() => {
    document.body.classList.add('background');
    document.body.classList.add('no-footer');

    return () => {
      document.body.classList.remove('background');
      document.body.classList.remove('no-footer');
    };
  }, []);
  return (
    <>
      <div className="fixed-background" />
      <main>
        <div className="container">
          <AnimatePresence exitBeforeEnter>
            <Suspense fallback={<div className="loading" />}>
              <Outlet />
            </Suspense>
          </AnimatePresence>
        </div>
      </main>
    </>
  );
};

export default Public;
