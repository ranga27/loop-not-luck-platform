/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { useQuery } from 'react-query';
import { useFirestoreQuery } from '@react-query-firebase/firestore';
import { collection, query } from 'firebase/firestore';
import { Card, CardBody } from 'reactstrap';
import { firestore, formatDateInArray } from '../../helpers';
import RolesCarousel from './RolesCarousel';

const ViewRolesContainer = () => {
  const user = useQuery(['userAuth']);
  const { uid } = user.data;
  const rolesRef = query(collection(firestore, `users/${uid}/matchedRoles`));
  const { isLoading, data: roles } = useFirestoreQuery(
    ['matchedRoles'],
    rolesRef,
    {
      subscribe: true,
    },
    {
      // React Query data selector - TODO: refactor
      select(snapshot) {
        const rolesData = snapshot.docs.map((document) => ({
          ...document.data(),
          id: document.id,
        }));
        return formatDateInArray(rolesData);
      },
    }
  );

  // TODO: add logic for no roles found
  if (isLoading) {
    return <div className="loading" />;
  }
  if (roles.length > 0) {
    const otherRoles = [];
    const topMatch = [];
    // TODO: combine save, apply, seen actions
    roles.forEach((role) => {
      if (role.score < 75) otherRoles.push(role);
      else topMatch.push(role);
    });
    return (
      <RolesCarousel
        roles={roles}
        otherRoles={otherRoles}
        topMatch={topMatch}
      />
    );
  }
  return (
    <div>
      <Card>
        <CardBody>
          <h3>Sorry, no roles for you yet</h3>
        </CardBody>
      </Card>
    </div>
  );
};

export default ViewRolesContainer;
