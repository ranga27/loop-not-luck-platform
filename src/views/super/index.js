import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import AppLayout from '../../layout/AppLayout';

const Users = React.lazy(() =>
  import(/* webpackChunkName: "admin-users" */ './Users')
);

const Test = React.lazy(() =>
  import(/* webpackChunkName: "admin-test" */ './Test')
);

const App = ({ match }) => (
  <AppLayout>
    <Suspense fallback={<div className="loading" />}>
      <Switch>
        <Redirect exact from={`${match.url}/`} to={`${match.url}/test`} />
        <Route
          path={`${match.url}/users`}
          render={(props) => <Users {...props} />}
        />
        <Route
          path={`${match.url}/test`}
          render={(props) => <Test {...props} />}
        />
        <Redirect to="/error" />
      </Switch>
    </Suspense>
  </AppLayout>
);
export default App;
