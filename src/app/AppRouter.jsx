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

const getRoute = (role, props) => {
  const routes = {
    super: <ViewSuper {...props} />,
    candidate: <ViewCandidate {...props} />,
  };
  return routes[role];
};

const AppRouter = ({ component: Component, ...rest }) => {
  const { currentUser } = useSelector((state) => state.authUser);
  return (
    <Suspense fallback={<div className="loading" />}>
      <Route {...rest} render={(props) => getRoute(currentUser.role, props)} />
    </Suspense>
  );
};
export default AppRouter;
