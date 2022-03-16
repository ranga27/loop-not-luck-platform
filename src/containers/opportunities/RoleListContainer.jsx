/* eslint-disable no-unused-vars */
import React from 'react';
import { collection, query } from 'firebase/firestore';
import { useFirestoreQuery } from '@react-query-firebase/firestore';
import RoleListItem from '../../components/cards/RoleListItem';
import { firestore } from '../../helpers/firebase';
import formatDate from '../candidate/formatDate';

const RoleListContainer = () => {
  const { isLoading, data: roles } = useFirestoreQuery(
    ['reviewRoles'],
    query(collection(firestore, 'roles')),
    {
      subscribe: true,
    },
    {
      // React Query data selector
      select(snapshot) {
        const rolesData = snapshot.docs.map((document) => ({
          ...document.data(),
          id: document.id,
        }));
        return formatDate(rolesData);
      },
    }
  );
  // TODO: add logic for no roles found
  if (isLoading) {
    return <div className="loading" />;
  }
  return <RoleListItem roles={roles} />;
};

export default RoleListContainer;
