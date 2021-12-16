import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const View = React.lazy(() =>
  import(/* webpackChunkName: "second" */ './ViewCandidatesPage')
);
const CandidatesMenu = ({ match }) => (
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
export default CandidatesMenu;
