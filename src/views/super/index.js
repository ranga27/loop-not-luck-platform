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
const SuperAdminRoute = () => {
  return (
    <AppLayout>
      <Suspense fallback={<div className="loading" />}>
        <Routes>
          <Route path="review" element={<Review />} />
          <Route path="test" element={<Test />} />
          <Route path="post" element={<Post />} />
          <Route path="users" element={<EditUsers />} />
          <Route path="logout" element={<Logout />} />
          <Route path="/" element={<Navigate to="review" />} />
        </Routes>
      </Suspense>
    </AppLayout>
  );
};
export default SuperAdminRoute;
