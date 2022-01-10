/* eslint-disable react/no-children-prop */
import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import AppLayout from '../../layout/AppLayout';

const App = () => {
  return (
    <AppLayout>
      <div className="dashboard-wrapper">
        <Suspense fallback={<div className="loading" />}>
          <Outlet />
        </Suspense>
      </div>
    </AppLayout>
  );
};

export default App;
