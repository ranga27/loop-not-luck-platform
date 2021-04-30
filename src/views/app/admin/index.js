import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const View = React.lazy(() =>
  import(/* webpackChunkName: "second" */ './Admin')
);
const AdminMenu = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/admin`} />
      <Route
        path={`${match.url}/admin`}
        render={(props) => <View {...props} />}
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default AdminMenu;
