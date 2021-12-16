import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const Post = React.lazy(() =>
  import(/* webpackChunkName: "post-opp" */ './PostOpportunityPage')
);

const Review = React.lazy(() =>
  import(/* webpackChunkName: "review-roles" */ './ReviewRoles')
);

const Open = React.lazy(() =>
  import(/* webpackChunkName: "open-roles" */ './OpenRolesPage')
);

const Roles = React.lazy(() =>
  import(/* webpackChunkName: "post-roles" */ './PostRoles')
);

const View = React.lazy(() =>
  import(/* webpackChunkName: "view-roles" */ './ViewRoles')
);
// TODO: protect routes according to the role, currently unprotected
const OpportunitiesMenu = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/view`} />
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
      <Route
        path={`${match.url}/view`}
        render={(props) => <View {...props} />}
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default OpportunitiesMenu;
