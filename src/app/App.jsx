/* eslint-disable no-unused-vars */
import React, { Suspense } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import AppLocale from '../lang';
import ColorSwitcher from '../components/common/ColorSwitcher';
import { getDirection } from '../helpers/Utils';
import Public from '../views/public';
import Login from '../views/public/login';
import Register from '../views/public/register';
import ForgotPassword from '../views/public/forgot-password';
import RequireAuth from './RequireAuth';
import ProtectedRoute from './ProtectedRoute';
import ViewRoles from '../views/candidate/roles/ViewRoles';
import Account from '../views/candidate/Account';
import Error from '../views/error';
import Unauthorised from '../views/unauthorised';

const App = () => {
  const direction = getDirection();
  if (direction.isRtl) {
    document.body.classList.add('rtl');
    document.body.classList.remove('ltr');
  } else {
    document.body.classList.add('ltr');
    document.body.classList.remove('rtl');
  }

  const { locale } = useSelector((state) => state.settings);
  const currentAppLocale = AppLocale[locale];
  // TODO: Import as lazy loading
  return (
    <div className="h-100">
      <IntlProvider
        locale={currentAppLocale.locale}
        messages={currentAppLocale.messages}
      >
        <>
          <ColorSwitcher />
          <Suspense fallback={<div className="loading" />}>
            <Routes>
              <Route element={<RequireAuth />}>
                <Route path="app/*" element={<ProtectedRoute />} />
                <Route path="/" element={<Navigate to="app" />} />
              </Route>
              <Route element={<Public />}>
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="forgot-password" element={<ForgotPassword />} />
                <Route path="register" element={<Register />} />
                <Route path="error" element={<Error />} />
                <Route path="unauthorised" element={<Unauthorised />} />
                <Route path="*" element={<Error />} />
                <Route path="/" element={<Navigate to="login" />} />
              </Route>
            </Routes>
          </Suspense>
        </>
      </IntlProvider>
    </div>
  );
};

export default App;
