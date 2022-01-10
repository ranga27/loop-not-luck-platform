/* eslint-disable react/no-children-prop */
import React, { Suspense } from 'react';
import { Route, Routes, Navigate, useMatch } from 'react-router-dom';
import { connect } from 'react-redux';
import AppLayout from '../../layout/AppLayout';

const Opportunities = React.lazy(() =>
  import(/* webpackChunkName: "opportunities" */ './opportunities')
);
const Account = React.lazy(() =>
  import(/* webpackChunkName: "account" */ './Account')
);

const App = () => {
  const { url } = useMatch();
  return (
    <AppLayout>
      <div className="dashboard-wrapper">
        <Suspense fallback={<div className="loading" />}>
          <Routes>
            <Route
              exact
              path={`${url}/`}
              render={() => <Navigate to={`${url}/opportunities`} />}
            />
            <Route path={`${url}/opportunities`} element={<Opportunities />} />
            <Route path={`${url}/account`} element={<Account />} />
            <Route path="*" render={() => <Navigate to="/error" />} />
          </Routes>
        </Suspense>
      </div>
    </AppLayout>
  );
};

const mapStateToProps = ({ menu }) => {
  const { containerClassnames } = menu;
  return { containerClassnames };
};

export default connect(mapStateToProps, {})(App);
