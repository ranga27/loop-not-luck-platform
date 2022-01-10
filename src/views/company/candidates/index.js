import React, { Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

const View = React.lazy(() =>
  import(/* webpackChunkName: "second" */ './ViewCandidatesPage')
);
const CandidatesMenu = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Routes>
      <Navigate exact from={`${match.url}/`} to={`${match.url}/view`} />
      <Route
        path={`${match.url}/view`}
        render={(props) => <View {...props} />}
      />
      <Navigate to="/error" />
    </Routes>
  </Suspense>
);
export default CandidatesMenu;
