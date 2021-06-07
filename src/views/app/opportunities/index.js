import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const Post = React.lazy(() =>
  import(/* webpackChunkName: "second" */ './PostOpportunityPage')
);

const Review = React.lazy(() =>
  import(/* webpackChunkName: "second" */ './ReviewRoles')
);

const Open = React.lazy(() =>
  import(/* webpackChunkName: "second" */ './OpenRolesPage')
);

const Roles = React.lazy(() =>
  import(/* webpackChunkName: "second" */ './PostRoles')
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
        path={`${match.url}/review`}
        render={(props) => <Review {...props} />}
      />
      <Route
        path={`${match.url}/open`}
        render={(props) => <Open {...props} />}
      />
      <Route
        path={`${match.url}/roles`}
        render={(props) => <Roles {...props} />}
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default OpportunitiesMenu;
