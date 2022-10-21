/* eslint-disable no-unused-vars */
import React, { Suspense, lazy } from 'react';
import { useAuthUser, useAuthSignOut } from '@react-query-firebase/auth';
import { collection, doc } from 'firebase/firestore';
import { useFirestoreDocumentData } from '@react-query-firebase/firestore';
import { auth, firestore } from '../helpers/Firebase';
import useDocument from '../hooks/useDocument';

const SuperAdminRoute = lazy(() =>
  import(/* webpackChunkName: "super-admin" */ '../views/super')
);

const CandidateRoute = lazy(() =>
  import(/* webpackChunkName: "candidate-route" */ '../views/candidate')
);

const CompanyRoute = lazy(() =>
  import(/* webpackChunkName: "company-route" */ '../views/company')
);

// TODO: implement redirect to unauthorised
const getRoute = (role) => {
  const route = {
    super: <SuperAdminRoute />,
    candidate: <CandidateRoute />,
    employer: <CompanyRoute />,
  };
  return route[role];
};

const ProtectedRoute = () => {
  const signOut = useAuthSignOut(auth);
  // TODO: check if useQuery is more performant than useAuthUser
  const userAuth = useAuthUser(['userAuth'], auth);
  const { uid } = userAuth.data;

  const { isLoading: isUserDataLoading, data: user } = useDocument(
    'users',
    uid
  );
  if (isUserDataLoading) {
    return <div className="loading" />;
  }
  return (
    <Suspense fallback={<div className="loading" />}>
      {user ? getRoute(user.role) : <div>User not available</div>}
    </Suspense>
  );
};

export default ProtectedRoute;
