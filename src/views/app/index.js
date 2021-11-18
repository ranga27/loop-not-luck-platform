import React, { Suspense } from 'react';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { ProtectedRoute } from '../../helpers/authHelper';
import AppLayout from '../../layout/AppLayout';
import { UserRole } from '../../constants/defaultValues';

const Opportunities = React.lazy(() =>
  import(/* webpackChunkName: "opportunities" */ './opportunities')
);
const Candidates = React.lazy(() =>
  import(/* webpackChunkName: "candidates" */ './candidates')
);
const Admin = React.lazy(() =>
  import(/* webpackChunkName: "admin" */ './admin')
);
const Account = React.lazy(() =>
  import(/* webpackChunkName: "account" */ './Account')
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
              path={`${match.url}/opportunities`}
              render={(props) => <Opportunities {...props} />}
            />
            <Route
              path={`${match.url}/candidates`}
              render={(props) => <Candidates {...props} />}
            />
            <Route
              path={`${match.url}/account`}
              render={(props) => <Account {...props} />}
            />
            <ProtectedRoute
              path={`${match.url}/admin`}
              component={Admin}
              roles={[UserRole.admin]}
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
