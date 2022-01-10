/* eslint-disable react/no-children-prop */
import React, { Suspense } from 'react';
import { Navigate, Route, Routes, useMatch } from 'react-router-dom';
import AppLayout from '../../layout/AppLayout';

const Users = React.lazy(() =>
  import(/* webpackChunkName: "admin-users" */ './Users')
);

const Test = React.lazy(() =>
  import(/* webpackChunkName: "admin-test" */ './Test')
);

const App = () => {
  const { url } = useMatch();
  return (
    <AppLayout>
      <Suspense fallback={<div className="loading" />}>
        <Routes>
          <Route
            exact
            path={`${url}/`}
            render={() => <Navigate to={`${url}/test`} />}
          />
          <Route path={`${url}/users`} element={<Users />} />
          <Route path={`${url}/test`} element={<Test />} />
          <Route path="*" render={() => <Navigate to="/error" />} />
        </Routes>
      </Suspense>
    </AppLayout>
  );
};
export default App;
