/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Badge, Button, Card, CardBody, Col, Row } from 'reactstrap';
import { useQuery } from 'react-query';
import { NavLink } from 'react-router-dom';
import {
  collection,
  query,
  doc,
  serverTimestamp,
  where,
  orderBy,
} from 'firebase/firestore';
import {
  useFirestoreQuery,
  useFirestoreDocumentMutation,
} from '@react-query-firebase/firestore';
import Swal from 'sweetalert2';
import { firestore, formatDateInArray } from '../../helpers';
import { Colxx } from '../../components/common/CustomBootstrap';
import ViewRolesContainer from '../../containers/candidate/ViewRolesContainer';
import { getUpdatedMatchedRolesInDB } from '../../helpers/firebaseService';

const getRoles = (roles, type) => {
  return roles.filter((role) =>
    type === 'others' ? role.score < 75 : roles.score > 75
  );
};

const ViewRoles = () => {
  const userDoc = useQuery('userDoc');

  const [activeRoleTab, setActiveRoleTab] = useState('recommended');

  const loadActiveTab = (activeTab) => setActiveRoleTab(activeTab);

  const user = useQuery(['userAuth']);
  const { uid } = user.data;
  const rolesRef = query(
    collection(firestore, `users/${uid}/matchedRoles`),
    orderBy('deadline', 'asc'),
    orderBy('score', 'desc'),
    where('deadline', '>', new Date(Date.now()))
  );

  const userRef = doc(firestore, 'users', uid);
  const userMutation = useFirestoreDocumentMutation(userRef, {
    merge: true,
  });

  const { configLoading, data: config } = useFirestoreQuery(
    ['config'],
    query(collection(firestore, 'config')),
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
        return rolesData;
      },
    }
  );

  const { isLoading, data: roles } = useFirestoreQuery(
    ['matchedRoles'],
    rolesRef,
    {
      subscribe: true,
    },
    {
      select(snapshot) {
        const rolesData = snapshot.docs.map((document) => ({
          ...document.data(),
          id: document.id,
        }));
        return formatDateInArray(rolesData);
      },
    }
  );

  if (userDoc.isLoading || isLoading || configLoading) {
    return <div className="loading" />;
  }

  const onSubmit = async () => {
    if (
      userDoc.data.rolesLastRefreshed &&
      userDoc.data.rolesLastRefreshed > config[0].lastUpdated
    ) {
      Swal.fire('Oops!', 'No new roles, please refresh later!', 'error');
    } else {
      await getUpdatedMatchedRolesInDB(uid);
      userMutation.mutate({ rolesLastRefreshed: serverTimestamp() });
    }
  };

  if (userDoc.data) {
    if (userDoc.data.hasCompletedProfile) {
      return (
        <Row>
          <Colxx xxs="12" className="pl-0 pr-0 mb-5">
            <div className="d-flex flex-row">
              <h3 style={{ fontWeight: 'bold' }}>
                {activeRoleTab === 'recommended'
                  ? 'Your Top Recommended Roles'
                  : 'Other Roles'}
                <Badge color="primary" pill className="m-1">
                  {activeRoleTab === 'recommended'
                    ? roles.length // To use in future -> getRoles(roles, 'topMatch').length
                    : getRoles(roles, 'others').length}
                </Badge>
              </h3>
              <Button
                onClick={() => onSubmit()}
                style={{ marginLeft: '15px' }}
                data-cy="my-loop-refresh-roles-button"
              >
                Refresh roles
              </Button>
            </div>
            <ViewRolesContainer
              isLoading={isLoading}
              roles={roles}
              otherRoles={getRoles(roles, 'others')}
              topMatch={getRoles(roles, 'topMatch')}
              loadActiveTab={loadActiveTab}
            />
          </Colxx>
        </Row>
      );
    }
    return (
      <div>
        <Card>
          <CardBody>
            <h3>
              {userDoc.data.firstName}, please complete your profile to view
              roles! Click{' '}
              <NavLink to="/app/account" style={{ color: 'green' }}>
                here
              </NavLink>{' '}
              to complete your profile.
            </h3>
          </CardBody>
        </Card>
      </div>
    );
  }
  return <div />;
};

export default ViewRoles;
