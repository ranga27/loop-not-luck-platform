/* eslint-disable no-unused-vars */
import React, { lazy } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ViewUser = lazy(() =>
  import(/* webpackChunkName: "views-user" */ '../views/user')
);
const ViewError = lazy(() =>
  import(/* webpackChunkName: "views-error" */ '../views/error')
);
const ViewUnauthorized = lazy(() =>
  import(/* webpackChunkName: "views-unauthorized" */ '../views/unauthorized')
);
const Login = lazy(() =>
  import(/* webpackChunkName: "user-login" */ '../views/user/login')
);
const Register = lazy(() =>
  import(/* webpackChunkName: "user-register" */ '../views/user/register')
);
const ForgotPassword = lazy(() =>
  import(
    /* webpackChunkName: "user-forgot-password" */ '../views/user/forgot-password'
  )
);
const ResetPassword = lazy(() =>
  import(
    /* webpackChunkName: "user-reset-password" */ '../views/user/reset-password'
  )
);
const ViewCandidate = React.lazy(() =>
  import(/* webpackChunkName: "views-candidate" */ '../views/candidate')
);
const Opportunities = React.lazy(() =>
  import(
    /* webpackChunkName: "opportunities" */ '../views/candidate/opportunities'
  )
);
const ViewRoles = React.lazy(() =>
  import(
    /* webpackChunkName: "view-roles" */ '../views/candidate/opportunities/ViewRoles'
  )
);
const Account = React.lazy(() =>
  import(/* webpackChunkName: "account" */ '../views/candidate/Account')
);

const routes = (user) => [
  {
    path: '/',
    element: !user ? <Outlet /> : <Navigate to="/app" />,
    children: [
      {
        path: 'user/*',
        element: <ViewUser />,
        children: [
          {
            path: 'login',
            element: <Login />,
          },
          { path: '/', element: <Navigate to="/user/login" /> },
          {
            path: 'register',
            element: <Register />,
          },
          {
            path: 'forgot-password',
            element: <ForgotPassword />,
          },
          {
            path: 'reset-password',
            element: <ResetPassword />,
          },
          {
            path: '*',
            element: <ViewError />,
          },
        ],
      },
      { path: '/', element: <Navigate to="/user" /> },
      {
        path: 'error',
        element: <ViewError />,
      },
      {
        path: 'unauthorised',
        element: <ViewUnauthorized />,
      },
      {
        path: '*',
        element: <ViewError />,
      },
    ],
  },
  {
    path: 'app/*',
    element: user ? <ViewCandidate /> : <Navigate to="/" />,
    children: [
      {
        path: 'opportunities',
        element: <Opportunities />,
        children: [{ path: 'view', element: <ViewRoles /> }],
      },
      { path: '/', element: <Navigate to="/app" /> },
      { path: 'account', element: <Account /> },
    ],
  },
];

export default routes;
