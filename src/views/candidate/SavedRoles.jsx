/* eslint-disable no-unused-vars */
import React from 'react';
import { collection, query, where } from 'firebase/firestore';
import { useFirestoreQuery } from '@react-query-firebase/firestore';
import { Badge, Button, Card, CardBody, Col, Row } from 'reactstrap';
import { useQuery } from 'react-query';
import { NavLink } from 'react-router-dom';
import { Colxx } from '../../components/common/CustomBootstrap';
import ViewRolesContainer from '../../containers/candidate/ViewRolesContainer';
import { firestore } from '../../helpers/firebase';
import { formatDateInArray } from '../../helpers/utils';
import SavedRoleCard from '../../components/cards/SavedRoleCard';

const SavedRoles = () => {
  const user = useQuery(['userAuth']);
  const { uid } = user.data;
  const { isLoading, data: savedRoles } = useFirestoreQuery(
    ['savedRoles'],
    query(
      collection(firestore, `users/${uid}/matchedRoles`),
      where('saved', '==', true)
    ),
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
        return formatDateInArray(rolesData);
      },
    }
  );
  if (isLoading) {
    return <div className="loading" />;
  }

  if (savedRoles.length > 0) {
    return (
      <Row>
        <h1>Your Saved Roles</h1>
        {savedRoles.map((role) => {
          return (
            <Colxx lg="6" className="my-5" key={role.id}>
              <SavedRoleCard role={role} />
            </Colxx>
          );
        })}
      </Row>
    );
  }
  return (
    <div>
      <Card>
        <CardBody>
          <h3>Sorry, no saved roles for you yet</h3>
        </CardBody>
      </Card>
    </div>
  );
};

export default SavedRoles;
