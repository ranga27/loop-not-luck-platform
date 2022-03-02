/* eslint-disable no-unused-vars */
import React, { Suspense, lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import { useAuthUser } from '@react-query-firebase/auth';
import AppLocale from '../lang';
import { auth } from '../helpers/firebase';

const Public = lazy(() =>
  import(/* webpackChunkName: "public-route" */ '../views/public')
);
const RequireAuth = lazy(() =>
  import(/* webpackChunkName: "require-auth" */ './RequireAuth')
);
const ProtectedRoute = lazy(() =>
  import(/* webpackChunkName: "protected-route" */ './ProtectedRoute')
);
const App = () => {
  const { isLoading, data: user } = useAuthUser(['userAuth'], auth, {
    onSuccess(data) {
      if (data) {
        console.debug('User is authenticated!');
      }
    },
    onError(error) {
      console.error('Failed to subscribe to users authentication state!');
    },
  });
  document.body.classList.add('ltr');
  document.body.classList.remove('rtl');

  // const { locale } = useSelector((state) => state.settings);
  const currentAppLocale = AppLocale.en;
  // TODO: Import as lazy loading
  return (
    <div className="h-100">
      <IntlProvider
        locale={currentAppLocale.locale}
        messages={currentAppLocale.messages}
      >
        <Suspense fallback={<div className="loading" />}>
          <Routes>
            <Route element={<RequireAuth />}>
              <Route path="app/*" element={<ProtectedRoute />} />
              <Route path="/" element={<Navigate to="app" />} />
            </Route>
            <Route path="*" element={<Public />} />
          </Routes>
        </Suspense>
      </IntlProvider>
    </div>
  );
};

export default App;
