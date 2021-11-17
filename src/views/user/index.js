import React, { Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
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
const User = ({ match }) => {
  return (
    <UserLayout>
      <AnimatePresence exitBeforeEnter>
        <Suspense fallback={<div className="loading" />}>
          <Switch>
            <Redirect exact from={`${match.url}/`} to={`${match.url}/login`} />
            <Route
              path={`${match.url}/login`}
              render={(props) => <Login {...props} />}
            />
            <Route
              path={`${match.url}/register`}
              render={(props) => <Register {...props} />}
            />
            <Route
              path={`${match.url}/forgot-password`}
              render={(props) => <ForgotPassword {...props} />}
            />
            <Route
              path={`${match.url}/reset-password`}
              render={(props) => <ResetPassword {...props} />}
            />
            <Redirect to="/error" />
          </Switch>
        </Suspense>{' '}
      </AnimatePresence>
    </UserLayout>
  );
};

export default User;
