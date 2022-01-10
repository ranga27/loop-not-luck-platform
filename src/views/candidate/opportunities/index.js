/* eslint-disable react/no-children-prop */
import React, { Suspense } from 'react';
import { Navigate, Route, Routes, useMatch } from 'react-router-dom';

const ViewRoles = React.lazy(() =>
  import(/* webpackChunkName: "view-roles" */ './ViewRoles')
);
// TODO: use protected route based on the role, for additional security add firebase rules on document & collection level
const OpportunitiesMenu = () => {
  const { url } = useMatch();
  return (
    <Suspense fallback={<div className="loading" />}>
      <Routes>
        <Route
          exact
          path={`${url}/`}
          render={() => <Navigate to={`${url}/view`} />}
        />
        <Route path={`${url}/view`} children={<ViewRoles />} />
        <Route path="*" render={() => <Navigate to="/error" />} />
      </Routes>
    </Suspense>
  );
};
export default OpportunitiesMenu;
