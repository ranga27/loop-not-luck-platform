import React, { Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

const Companies = React.lazy(() =>
  import(/* webpackChunkName: "admin-companies" */ './Companies')
);

const AddCompany = React.lazy(() =>
  import(/* webpackChunkName: "add-company" */ './AddCompany')
);

const EditCompany = React.lazy(() =>
  import(/* webpackChunkName: "edit-company" */ './EditCompany')
);

const AdminMenu = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Routes>
      <Route
        path={`${match.url}/companies`}
        render={(props) => <Companies {...props} />}
      />
      <Route
        path={`${match.url}/addcompany`}
        render={(props) => <AddCompany {...props} />}
      />
      <Route
        path={`${match.url}/editcompany`}
        render={(props) => <EditCompany {...props} />}
      />
      <Navigate to="/error" />
    </Routes>
  </Suspense>
);
export default AdminMenu;
