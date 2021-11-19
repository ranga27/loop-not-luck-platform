import React, { Suspense } from 'react';
import { useSelector } from 'react-redux';

const ViewApp = React.lazy(() =>
  import(/* webpackChunkName: "views-app" */ './app')
);

const ViewOnboarding = React.lazy(() =>
  import(/* webpackChunkName: "views-onboarding" */ './onboarding')
);
const Private = () => {
  const { currentUser, isProfileComplete } = useSelector(
    (state) => state.authUser
  );
  return (
    <Suspense fallback={<div className="loading" />}>
      {currentUser.role === 'candidate' && !isProfileComplete ? (
        <ViewOnboarding />
      ) : (
        <ViewApp />
      )}
    </Suspense>
  );
};
export default Private;
