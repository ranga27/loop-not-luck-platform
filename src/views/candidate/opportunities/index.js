import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const View = React.lazy(() =>
  import(/* webpackChunkName: "view-roles" */ './ViewRoles')
);
// TODO: protect routes according to the role, currently unprotected
const OpportunitiesMenu = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/view`} />
      <Route
        path={`${match.url}/view`}
        render={(props) => <View {...props} />}
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default OpportunitiesMenu;
