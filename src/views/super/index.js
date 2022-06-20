/* eslint-disable react/no-children-prop */
import React, { Suspense, lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import AppLayout from '../../layout/AppLayout';

const EditUsers = lazy(() =>
  import(/* webpackChunkName: "admin-users" */ './EditUsers')
);

const Test = lazy(() => import(/* webpackChunkName: "admin-test" */ './Test'));

const Post = lazy(() =>
  import(/* webpackChunkName: "admin-post" */ './PostRole')
);

const Review = lazy(() =>
  import(/* webpackChunkName: "admin-review-roles" */ './ReviewRoles')
);

const Logout = lazy(() =>
  import(/* webpackChunkName: "admin-logout" */ './Logout')
);

const Companies = lazy(() =>
  import(/* webpackChunkName: "admin-companies" */ './companies')
);

const ViewCompanies = lazy(() =>
  import(
    /* webpackChunkName: "admin-view-company" */ './companies/ViewCompanies'
  )
);

const EditCompany = lazy(() =>
  import(/* webpackChunkName: "admin-edit-company" */ './companies/EditCompany')
);

const AddCompany = lazy(() =>
  import(/* webpackChunkName: "admin-add-company" */ './companies/AddCompany')
);

const ScreenApplications = lazy(() =>
  import(
    /* webpackChunkName: "admin-screen-applications" */ './screening/AllApplications'
  )
);

const Templates = lazy(() =>
  import(/* webpackChunkName: "admin-templates" */ './Templates')
);

const ViewTemplates = lazy(() =>
  import(/* webpackChunkName: "admin-templates" */ './Templates/ViewTemplates')
);

const AddTemplate = lazy(() =>
  import(/* webpackChunkName: "admin-templates" */ './Templates/AddTemplate')
);

const EditTemplate = lazy(() =>
  import(/* webpackChunkName: "admin-templates" */ './Templates/EditTemplate')
);

const UserProfiles = lazy(() =>
  import(/* webpackChunkName: "admin-profiles-list" */ './profiles')
);

const ManageProfiles = lazy(() =>
  import(
    /* webpackChunkName: "admin-profiles" */ './profiles/ProfilesContainer'
  )
);

const UserProfile = lazy(() =>
  import(/* webpackChunkName: "admin-user-profile" */ './profiles/UserProfile')
);

const SuperAdminRoute = () => {
  return (
    <AppLayout>
      <Suspense fallback={<div className="loading" />}>
        <Routes>
          <Route path="review" element={<Review />} />
          <Route path="post" element={<Post />} />
          <Route path="test" element={<Test />} />
          <Route path="users" element={<EditUsers />} />
          <Route path="companies" element={<Companies />}>
            <Route index element={<ViewCompanies />} />
            <Route path="view" element={<ViewCompanies />} />
            <Route path="edit" element={<EditCompany />} />
            <Route path="add" element={<AddCompany />} />
          </Route>
          <Route path="screening" element={<ScreenApplications />} />
          {/* <Route path="profiles" element={<ManageProfiles />} /> */}

          <Route path="profiles" element={<UserProfiles />}>
            <Route index element={<ManageProfiles />} />
            <Route path=":id" element={<UserProfile />} />
          </Route>

          <Route path="templates" element={<Templates />}>
            <Route index element={<ViewTemplates />} />
            <Route path="view" element={<ViewTemplates />} />
            <Route path="edit" element={<EditTemplate />} />
            <Route path="add" element={<AddTemplate />} />
          </Route>
          <Route path="logout" element={<Logout />} />
          <Route path="/" element={<Navigate to="review" />} />
        </Routes>
      </Suspense>
    </AppLayout>
  );
};
export default SuperAdminRoute;
