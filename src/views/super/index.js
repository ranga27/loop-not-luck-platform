/* eslint-disable react/no-children-prop */
import React, { Suspense } from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import AppLayout from '../../layout/AppLayout';

const Users = React.lazy(() =>
  import(/* webpackChunkName: "admin-users" */ './Users')
);

const Test = React.lazy(() =>
  import(/* webpackChunkName: "admin-test" */ './Test')
);

const App = () => {
  const { url } = useRouteMatch();
  return (
    <AppLayout>
      <Suspense fallback={<div className="loading" />}>
        <Switch>
          <Route
            exact
            path={`${url}/`}
            render={() => <Redirect to={`${url}/test`} />}
          />
          <Route path={`${url}/users`} children={<Users />} />
          <Route path={`${url}/test`} children={<Test />} />
          <Route path="*" render={() => <Redirect to="/error" />} />
        </Switch>
      </Suspense>
    </AppLayout>
  );
};
export default App;
