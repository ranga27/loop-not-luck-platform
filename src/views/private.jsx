import React, { Suspense } from 'react';
import { Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ViewApp = React.lazy(() =>
  import(/* webpackChunkName: "views-app" */ './app')
);

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
            <ViewApp {...props} />
          )
        }
      />
    </Suspense>
  );
};
export default PrivateRoute;
