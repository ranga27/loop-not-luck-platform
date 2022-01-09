/* eslint-disable react/no-children-prop */
import React, { Suspense } from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';

const ViewRoles = React.lazy(() =>
  import(/* webpackChunkName: "view-roles" */ './ViewRoles')
);
// TODO: use protected route based on the role, for additional security add firebase rules on document & collection level
const OpportunitiesMenu = () => {
  const { url } = useRouteMatch();
  return (
    <Suspense fallback={<div className="loading" />}>
      <Switch>
        <Route
          exact
          path={`${url}/`}
          render={() => <Redirect to={`${url}/view`} />}
        />
        <Route path={`${url}/view`} children={<ViewRoles />} />
        <Route path="*" render={() => <Redirect to="/error" />} />
      </Switch>
    </Suspense>
  );
};
export default OpportunitiesMenu;
