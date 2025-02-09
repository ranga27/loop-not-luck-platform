import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import PublicLayout from '../../layout/PublicLayout';

const Login = lazy(() => import(/* webpackChunkName: "login" */ './Login'));
const Register = lazy(() =>
  import(/* webpackChunkName: "register" */ './Register')
);
const ForgotPassword = lazy(() =>
  import(/* webpackChunkName: "forgot" */ './Forgot-password')
);
const Error = lazy(() => import(/* webpackChunkName: "error" */ '../Error'));
const Unauthorised = lazy(() =>
  import(/* webpackChunkName: "unauthorised" */ '../Unauthorised')
);
const EmailConfirmation = lazy(() =>
  import(/* webpackChunkName: "email-confirmation" */ './EmailConfirmation')
);
const ResetPassword = lazy(() =>
  import(
    /* webpackChunkName: "reset-password-confirmation" */ './Reset-password'
  )
);
// TODO: Replace Loading in Suspense with a framer motion effect
const Public = () => {
  return (
    <PublicLayout>
      <AnimatePresence exitBeforeEnter>
        <Suspense fallback={<div className="loading" />}>
          <Routes>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route path="error" element={<Error />} />
            <Route path="unauthorised" element={<Unauthorised />} />
            <Route
              path="email-confirmation/success"
              element={<EmailConfirmation success />}
            />
            <Route
              path="email-confirmation/failure"
              element={<EmailConfirmation />}
            />
            <Route
              path="password-reset-confirmation"
              element={<ResetPassword success />}
            />
            <Route path="*" element={<Error />} />
            <Route path="/" element={<Navigate to="login" />} />
          </Routes>
        </Suspense>
      </AnimatePresence>
    </PublicLayout>
  );
};

export default Public;
