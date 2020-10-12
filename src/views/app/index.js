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
const BlankPage = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './blank-page')
);

const App = ({ match }) => {
  return (
    <AppLayout>
      <div className="dashboard-wrapper">
        <Suspense fallback={<div className="loading" />}>
          <Switch>
            <Route
              path={`${match.url}/dashboard`}
              render={(props) => <Dashboard {...props} />}
            />
            <Redirect exact from={`${match.url}/`} to={`${match.url}/dashboard`} />
            <Route
              path={`${match.url}/opportunities`}
              render={(props) => <Opportunities {...props} />}
            />
            <Route
              path={`${match.url}/candidates`}
              render={(props) => <Candidates {...props} />}
            />
            {/* <ProtectedRoute
                    path={`${match.url}/second-menu`}
                    component={SecondMenu}
                    roles={[UserRole.Admin]}
            /> 
            <Route
              path={`${match.url}/blank-page`}
              render={(props) => <BlankPage {...props} />}
            /> */}
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
