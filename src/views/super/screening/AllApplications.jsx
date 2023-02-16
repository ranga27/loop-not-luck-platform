import React from 'react';
import { collection, query } from 'firebase/firestore';
import { useFirestoreQuery } from '@react-query-firebase/firestore';
import { firestore } from '../../../helpers';
import { formatDateInArray } from '../../../helpers/Utils';
import Application from './Application';

const AllApplications = () => {
  const { isLoading, data: usersList } = useFirestoreQuery(
    ['appliedRoles'],
    query(collection(firestore, 'appliedRoles')),
    {
      subscribe: true,
    },
    {
      select(snapshot) {
        const userData = snapshot.docs.map((document) => ({
          ...document.data(),
          id: document.id,
          recordId: `${document.data().userId.slice(-3)}${document
            .data()
            .roleId.slice(-2)}`.toUpperCase(),
        }));
        return formatDateInArray(userData);
      },
    }
  );

  if (isLoading) {
    return <div className="loading" />;
  }

  return <Application users={usersList} />;
};

export default AllApplications;
