import React, { Suspense, lazy } from 'react';
import { useAuthUser, useAuthSignOut } from '@react-query-firebase/auth';
import { collection, doc } from 'firebase/firestore';
import { useFirestoreDocumentData } from '@react-query-firebase/firestore';
import { auth, firestore } from '../helpers/Firebase';
import showUserError from '../helpers/showUserError';

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

const NoUserData = () => {
  const signOut = useAuthSignOut(auth);
  signOut.mutate();
  showUserError('no-user-data');
};

const ProtectedRoute = () => {
  const userAuth = useAuthUser(['userAuth'], auth);
  const { uid } = userAuth.data;
  const collectionRef = collection(firestore, 'users');
  const ref = doc(collectionRef, uid);
  const { isLoading: isUserDataLoading, data: user } = useFirestoreDocumentData(
    ['userDoc'],
    ref,
    {
      subscribe: true,
    }
  );
  if (isUserDataLoading) {
    return <div className="loading" />;
  }
  return (
    <Suspense fallback={<div className="loading" />}>
      {user ? getRoute(user.role) : NoUserData()}
    </Suspense>
  );
};

export default ProtectedRoute;
