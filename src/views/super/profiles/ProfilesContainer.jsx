import React from 'react';
import { collection, query, where, orderBy } from 'firebase/firestore';
import { useFirestoreQuery } from '@react-query-firebase/firestore';
import { firestore } from '../../../helpers';
import UserProfileTable from './UserProfileTable';
import { formatDateInArray } from '../../../helpers/Utils';

const ManageProfiles = () => {
  const { isLoading, data: usersList } = useFirestoreQuery(
    ['users'],
    query(
      collection(firestore, 'users'),
      where('role', '==', 'candidate'),
      orderBy('createdAt', 'desc')
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
        return formatDateInArray(userData);
      },
    }
  );

  if (isLoading) {
    return <div className="loading" />;
  }

  return <UserProfileTable profiles={usersList} />;
};

export default ManageProfiles;
