/* eslint-disable react/no-children-prop */
import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

// TODO: use protected route based on the role, for additional security add firebase rules on document & collection level
const OpportunitiesMenu = () => {
  return (
    <Suspense fallback={<div className="loading" />}>
      <Outlet />
    </Suspense>
  );
};
export default OpportunitiesMenu;
