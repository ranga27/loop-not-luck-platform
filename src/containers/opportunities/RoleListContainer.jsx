/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { collection, query } from 'firebase/firestore';
import { useFirestoreQuery } from '@react-query-firebase/firestore';
import RoleListItem from '../../components/cards/RoleListItem';
import { firestore } from '../../helpers/firebase';
import formatDate from '../candidate/formatDate';

const RoleListContainer = () => {
  const rolesCollection = collection(firestore, 'roles');
  const rolesRef = query(rolesCollection);
  const { isLoading, data: roles } = useFirestoreQuery(
    ['reviewRoles'],
    rolesRef,
    {
      subscribe: true,
    },
    {
      // React Query data selector
      select(snapshot) {
        const rolesData = snapshot.docs.map((document) => ({
          ...document.data().data,
          id: document.id,
        }));
        return formatDate(rolesData);
      },
    }
  );
  const selectRole = (role) => {
    // TODO: Use better name for selectedRole
  };
  useEffect(() => {
    const fetchRoles = async () => {
      // TODO: avoid multiple firestore reads, keep role list updated via listener
    };
    fetchRoles();
  }, []);
  // TODO: add logic for no roles found
  if (isLoading) {
    return <div className="loading" />;
  }
  return <RoleListItem roles={roles} selectRole={selectRole} />;
};

export default RoleListContainer;
