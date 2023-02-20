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

const ViewSoloCompany = lazy(() => import('./companies/ViewSoloCompany'));

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

const ScreeningPage = lazy(() =>
  import(/* webpackChunkName: "admin-screening-profile" */ './screening')
);

const UserInfo = lazy(() =>
  import(
    /* webpackChunkName: "admin-user-screening-profile" */ './screening/UserInfo'
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

const Privacy = lazy(() =>
  import(/* webpackChunkName: "admin-privacy" */ '../public/Privacy')
);

const Terms = lazy(() =>
  import(/* webpackChunkName: "admin-terms-and-conditions" */ '../public/Terms')
);

const HelpPage = lazy(() =>
  import(/* webpackChunkName: "admin-help-page" */ '../public/Help')
);

const AdminDashboard = lazy(() =>
  import(/* webpackChunkName: "admin-dashboard" */ './dashboard')
);

const Dashboard = lazy(() =>
  import(
    /* webpackChunkName: "admin-dashboard-page" */ './dashboard/DashboardContainer'
  )
);

const SuperAdminRoute = () => {
  return (
    <AppLayout>
      <Suspense fallback={<div className="loading" />}>
        <Routes>
          <Route path="privacy" element={<Privacy />} />
          <Route path="help" element={<HelpPage />} />
          <Route path="terms-and-conditions" element={<Terms />} />
          <Route path="review" element={<Review />} />
          <Route path="post" element={<Post />} />
          <Route path="test" element={<Test />} />
          <Route path="users" element={<EditUsers />} />
          <Route path="companies" element={<Companies />}>
            <Route index element={<ViewCompanies />} />
            <Route path="view" element={<ViewCompanies />} />
            <Route path="edit" element={<EditCompany />} />
            <Route path="add" element={<AddCompany />} />
            <Route path="viewsolo" element={<ViewSoloCompany />} />
          </Route>
          <Route path="screening" element={<ScreeningPage />}>
            <Route index element={<ScreenApplications />} />
            <Route path=":id/:roleId" element={<UserInfo />} />
          </Route>

          <Route path="profiles" element={<UserProfiles />}>
            <Route index element={<ManageProfiles />} />
            <Route path=":id" element={<UserProfile />} />
          </Route>
          <Route path="dashboard" element={<AdminDashboard />}>
            <Route index element={<Dashboard />} />
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
