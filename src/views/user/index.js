import React, { Suspense } from 'react';
import { Route, Switch, Redirect, useRouteMatch } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import UserLayout from '../../layout/UserLayout';

const Login = React.lazy(() =>
  import(/* webpackChunkName: "user-login" */ './login')
);
const Register = React.lazy(() =>
  import(/* webpackChunkName: "user-register" */ './register')
);
const ForgotPassword = React.lazy(() =>
  import(/* webpackChunkName: "user-forgot-password" */ './forgot-password')
);
const ResetPassword = React.lazy(() =>
  import(/* webpackChunkName: "user-reset-password" */ './reset-password')
);
// TODO: Replace Laoding Suspense with a framer motion effect
const User = () => {
  const { path } = useRouteMatch();
  return (
    <UserLayout>
      <AnimatePresence exitBeforeEnter>
        <Suspense fallback={<div className="loading" />}>
          <Switch>
            <Redirect exact from={`${path}/`} to={`${path}/login`} />
            <Route
              path={`${path}/login`}
              render={(props) => <Login {...props} />}
            />
            <Route
              path={`${path}/register`}
              render={(props) => <Register {...props} />}
            />
            <Route
              path={`${path}/forgot-password`}
              render={(props) => <ForgotPassword {...props} />}
            />
            <Route
              path={`${path}/reset-password`}
              render={(props) => <ResetPassword {...props} />}
            />
            <Redirect to="/error" />
          </Switch>
        </Suspense>
      </AnimatePresence>
    </UserLayout>
  );
};

export default User;
