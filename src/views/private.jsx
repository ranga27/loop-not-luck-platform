import React, { Suspense } from 'react';
import { Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

// TODO: Modify while implementing company route
const ViewCandidate = React.lazy(() =>
  import(/* webpackChunkName: "views-app" */ './candidate')
);

// TODO: Move onboarding to candidate folder
const ViewOnboarding = React.lazy(() =>
  import(/* webpackChunkName: "views-onboarding" */ './onboarding')
);
const PrivateRoute = ({ component: Component, ...rest }) => {
  const { currentUser } = useSelector((state) => state.authUser);
  return (
    <Suspense fallback={<div className="loading" />}>
      <Route
        {...rest}
        render={(props) =>
          currentUser.role === 'candidate' && !currentUser.isOnboarded ? (
            <ViewOnboarding {...props} />
          ) : (
            <ViewCandidate {...props} />
          )
        }
      />
    </Suspense>
  );
};
export default PrivateRoute;
