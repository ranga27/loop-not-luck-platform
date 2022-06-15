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
const ResetConfirmation = lazy(() =>
  import(
    /* webpackChunkName: "reset-password-confirmation" */ './ResetConfirmation'
  )
);
// TODO: Replace Loading in Suspense with a framer motion effect
const Public = () => {
  return (
    <PublicLayout>
      <AnimatePresence exitBeforeEnter>
        <Suspense fallback={<div className="loading" />}>
          <Routes>
            <Route path="register" element={<Register />} />
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
              element={<ResetConfirmation success />}
            />
            <Route path="*" element={<Error />} />
            <Route path="/" element={<Navigate to="register" />} />
          </Routes>
        </Suspense>
      </AnimatePresence>
    </PublicLayout>
  );
};

export default Public;
