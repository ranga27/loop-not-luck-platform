import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const Post = React.lazy(() =>
  import(/* webpackChunkName: "second" */ './PostOpportunityPage')
);

const Open = React.lazy(() =>
  import(/* webpackChunkName: "second" */ './OpenRolesPage')
);

const OpportunitiesMenu = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/post`} />
      <Route
        path={`${match.url}/post`}
        render={(props) => <Post {...props} />}
      />
      <Route
        path={`${match.url}/open`}
        render={(props) => <Open {...props} />}
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default OpportunitiesMenu;
