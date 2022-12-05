import React, { Suspense, lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import AppLocale from '../lang';
import BetaBanner from '../components/BetaBanner';

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
  document.body.classList.add('ltr');
  document.body.classList.remove('rtl');

  const currentAppLocale = AppLocale.en;
  // toggleModal: Import as lazy loading
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
      <BetaBanner />
    </div>
  );
};

export default App;
