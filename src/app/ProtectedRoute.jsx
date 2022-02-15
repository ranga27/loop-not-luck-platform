/* eslint-disable no-unused-vars */
import React, { Suspense, lazy } from 'react';
import { useAuthUser } from '@react-query-firebase/auth';
import { collection, doc } from 'firebase/firestore';
import { useFirestoreDocumentData } from '@react-query-firebase/firestore';
import { auth, firestore } from '../helpers/firebase';

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
  const userAuth = useAuthUser(['userAuth'], auth);
  const collectionRef = collection(firestore, 'users');
  const ref = doc(collectionRef, userAuth.data.uid);
  const userDoc = useFirestoreDocumentData(
    ['userDoc'],
    ref,
    {
      subscribe: true,
    },
    {
      onSuccess(data) {
        console.debug('User Data loaded successfully');
      },
      onError(error) {
        console.error('Woops, something went wrong!', error);
      },
    }
  );
  if (userDoc.isLoading) {
    return <div className="loading" />;
  }
  return (
    <Suspense fallback={<div className="loading" />}>
      {getRoute(userDoc.data.role)}
    </Suspense>
  );
};

export default ProtectedRoute;
