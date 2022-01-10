import React, { Suspense } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { ProtectedRoute } from '../../helpers/authHelper';
import AppLayout from '../../layout/AppLayout';
import { UserRole } from '../../constants/defaultValues';

const Opportunities = React.lazy(() =>
  import(/* webpackChunkName: "opportunities" */ './opportunities')
);
const Account = React.lazy(() =>
  import(/* webpackChunkName: "account" */ '../candidate/Account')
);
const Candidates = React.lazy(() =>
  import(/* webpackChunkName: "candidates" */ './candidates')
);
const Admin = React.lazy(() =>
  import(/* webpackChunkName: "admin" */ './admin')
);

const App = ({ match }) => {
  return (
    <AppLayout>
      <div className="dashboard-wrapper">
        <Suspense fallback={<div className="loading" />}>
          <Routes>
            <Navigate
              exact
              from={`${match.url}/`}
              to={`${match.url}/opportunities`}
            />
            <Route
              path={`${match.url}/opportunities`}
              render={(props) => <Opportunities {...props} />}
            />
            <Route
              path={`${match.url}/account`}
              render={(props) => <Account {...props} />}
            />
            <Route
              path={`${match.url}/candidates`}
              render={(props) => <Candidates {...props} />}
              roles={[UserRole.admin]}
            />
            <ProtectedRoute
              path={`${match.url}/admin`}
              component={Admin}
              roles={[UserRole.admin]}
            />
            <Navigate to="/error" />
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
