import React, { Suspense } from 'react';
import { useSelector } from 'react-redux';

const ViewApp = React.lazy(() =>
  import(/* webpackChunkName: "views-app" */ './app')
);

const ViewOnboarding = React.lazy(() =>
  import(/* webpackChunkName: "views-onboarding" */ './onboarding')
);
const Private = () => {
  const { currentUser } = useSelector((state) => state.authUser);
  return (
    <Suspense fallback={<div className="loading" />}>
      {currentUser.role === 'candidate' && !currentUser.isOnboarded ? (
        <ViewOnboarding />
      ) : (
        <ViewApp />
      )}
    </Suspense>
  );
};
export default Private;
