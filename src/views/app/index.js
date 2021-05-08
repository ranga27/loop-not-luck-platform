import React, { Suspense } from 'react';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import AppLayout from '../../layout/AppLayout';
// import { ProtectedRoute, UserRole } from '../../helpers/authHelper';

const Dashboard = React.lazy(() =>
  import(/* webpackChunkName: "viwes-dashboard" */ './DashboardPage')
);
const Opportunities = React.lazy(() =>
  import(/* webpackChunkName: "viwes-second-menu" */ './opportunities')
);
const Candidates = React.lazy(() =>
  import(/* webpackChunkName: "viwes-second-menu" */ './candidates')
);
const Onboarding = React.lazy(() =>
  import(/* webpackChunkName: "viwes-onboarding" */ './Onboarding')
);
const Account = React.lazy(() =>
  import(/* webpackChunkName: "viwes-dashboard" */ './Account')
);
const Admin = React.lazy(() =>
  import(/* webpackChunkName: "viwes-dashboard" */ './Admin')
);
const App = ({ match }) => {
  return (
    <AppLayout>
      <div className="dashboard-wrapper">
        <Suspense fallback={<div className="loading" />}>
          <Switch>
            <Redirect
              exact
              from={`${match.url}/`}
              to={`${match.url}/opportunities`}
            />
            <Route
              path={`${match.url}/dashboard`}
              render={(props) => <Dashboard {...props} />}
            />
            <Route
              path={`${match.url}/opportunities`}
              render={(props) => <Opportunities {...props} />}
            />
            <Route
              path={`${match.url}/candidates`}
              render={(props) => <Candidates {...props} />}
            />
            <Route
              path={`${match.url}/onboarding`}
              render={(props) => <Onboarding {...props} />}
            />
            <Route
              path={`${match.url}/account`}
              render={(props) => <Account {...props} />}
            />
            <Route
              path={`${match.url}/admin`}
              render={(props) => <Admin {...props} />}
            />
            <Redirect to="/error" />
          </Switch>
        </Suspense>
      </div>
    </AppLayout>
  );
};

const mapStateToProps = ({ menu }) => {
  const { containerClassnames } = menu;
  return { containerClassnames };
};

export default withRouter(connect(mapStateToProps, {})(App));
