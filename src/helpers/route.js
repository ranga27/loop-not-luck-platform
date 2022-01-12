/* eslint-disable no-unused-vars */
import React, { lazy } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ViewUser = lazy(() =>
  import(/* webpackChunkName: "views-user" */ '../views/public')
);
const ViewError = lazy(() =>
  import(/* webpackChunkName: "views-error" */ '../views/error')
);
const ViewUnauthorised = lazy(() =>
  import(/* webpackChunkName: "views-unauthorised" */ '../views/unauthorised')
);
const Login = lazy(() =>
  import(/* webpackChunkName: "user-login" */ '../views/public/login')
);
const Register = lazy(() =>
  import(/* webpackChunkName: "user-register" */ '../views/public/register')
);
const ForgotPassword = lazy(() =>
  import(
    /* webpackChunkName: "user-forgot-password" */ '../views/public/forgot-password'
  )
);
const ResetPassword = lazy(() =>
  import(
    /* webpackChunkName: "user-reset-password" */ '../views/public/reset-password'
  )
);
const ViewCandidate = React.lazy(() =>
  import(/* webpackChunkName: "views-candidate" */ '../views/candidate')
);
const Opportunities = React.lazy(() =>
  import(/* webpackChunkName: "opportunities" */ '../views/candidate/roles')
);
const ViewRoles = React.lazy(() =>
  import(
    /* webpackChunkName: "view-roles" */ '../views/candidate/roles/ViewRoles'
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
      { path: '/', element: <Navigate to="user/login" /> },
      {
        path: 'error',
        element: <ViewError />,
      },
      {
        path: 'unauthorised',
        element: <ViewUnauthorised />,
      },
      {
        path: '*',
        element: <ViewError />,
      },
    ],
  },
  {
    path: '/app',
    element:
      user.role === 'candidate' ? (
        <Navigate to="opportunities/view" />
      ) : (
        <Navigate to="test" />
      ),
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
      { path: 'account', element: <Account /> },
    ],
  },
];

export default routes;
