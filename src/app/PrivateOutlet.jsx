/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-nested-ternary */
import React, { Suspense } from 'react';
import { Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

// TODO: Modify while implementing company/admin routes
const ViewCandidate = React.lazy(() =>
  import(/* webpackChunkName: "views-candidate" */ '../views/candidate')
);

// TODO: Move onboarding to candidate folder and move the route selection into candidate
const ViewOnboarding = React.lazy(() =>
  import(
    /* webpackChunkName: "views-onboarding" */ '../views/candidate/onboarding'
  )
);

const ViewSuper = React.lazy(() =>
  import(/* webpackChunkName: "views-super" */ '../views/super')
);

const getRoute = (user, props) => {
  const routes = {
    super: <ViewSuper {...props} />,
    candidate: user.isOnboarded ? (
      <ViewCandidate {...props} />
    ) : (
      <ViewOnboarding {...props} />
    ),
  };
  return routes[user.role];
};

const AppRouter = ({ component: Component, ...rest }) => {
  const { currentUser } = useSelector((state) => state.auth);
  return (
    <Suspense fallback={<div className="loading" />}>
      <Route {...rest} render={(props) => getRoute(currentUser, props)} />
    </Suspense>
  );
};
export default AppRouter;
