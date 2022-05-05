import React from 'react';
import { collection, query, where } from 'firebase/firestore';
import { useFirestoreQuery } from '@react-query-firebase/firestore';
import { firestore } from '../../../helpers';
import Application from './Application';

const AllApplications = () => {
  const { isLoading, data: usersList } = useFirestoreQuery(
    ['users'],
    query(
      collection(firestore, 'users'),
      where('hasCompletedProfile', '==', true),
      where('role', '==', 'candidate')
    ),
    {
      subscribe: true,
    },
    {
      select(snapshot) {
        const userData = snapshot.docs.map((document) => ({
          ...document.data(),
          id: document.id,
        }));
        return userData;
      },
    }
  );

  if (isLoading) {
    return <div className="loading" />;
  }

  return <Application users={usersList} />;
};

export default AllApplications;
