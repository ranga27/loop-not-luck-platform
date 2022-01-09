/* eslint-disable react/no-children-prop */
import React, { Suspense } from 'react';
import {
  Route,
  withRouter,
  Switch,
  Redirect,
  useRouteMatch,
} from 'react-router-dom';
import { connect } from 'react-redux';
import AppLayout from '../../layout/AppLayout';

const Opportunities = React.lazy(() =>
  import(/* webpackChunkName: "opportunities" */ './opportunities')
);
const Account = React.lazy(() =>
  import(/* webpackChunkName: "account" */ './Account')
);

const App = () => {
  const { url } = useRouteMatch();
  return (
    <AppLayout>
      <div className="dashboard-wrapper">
        <Suspense fallback={<div className="loading" />}>
          <Switch>
            <Route
              exact
              path={`${url}/`}
              render={() => <Redirect to={`${url}/opportunities`} />}
            />
            <Route path={`${url}/opportunities`} children={<Opportunities />} />
            <Route path={`${url}/account`} children={<Account />} />
            <Route path="*" render={() => <Redirect to="/error" />} />
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
