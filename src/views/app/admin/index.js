import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const Users = React.lazy(() =>
  import(/* webpackChunkName: "admin-users" */ './Users')
);

const Companies = React.lazy(() =>
  import(/* webpackChunkName: "admin-companies" */ './Companies')
);

const AddCompany = React.lazy(() =>
  import(/* webpackChunkName: "add-company" */ './AddCompany')
);

const AdminMenu = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/users`} />
      <Route
        path={`${match.url}/users`}
        render={(props) => <Users {...props} />}
      />
      <Route
        path={`${match.url}/companies`}
        render={(props) => <Companies {...props} />}
      />
      <Route
        path={`${match.url}/addcompany`}
        render={(props) => <AddCompany {...props} />}
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default AdminMenu;
