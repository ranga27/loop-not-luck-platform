import React from 'react';
import { collection, query, where } from 'firebase/firestore';
import { useFirestoreQuery } from '@react-query-firebase/firestore';
import { Card, CardBody, Row } from 'reactstrap';
import { useQuery } from 'react-query';
import { Colxx } from '../../components/common/CustomBootstrap';
import { firestore } from '../../helpers/firebase';
import { formatDateInArray, getDaysToDeadline } from '../../helpers/utils';
import SavedRoleCard from '../../components/cards/SavedRoleCard';
import ExpiredRoleCard from '../../components/cards/ExpiredRoleCard';

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
          daysToDeadline: getDaysToDeadline(document.data().deadline),
        }));
        return formatDateInArray(rolesData);
      },
    }
  );
  if (isLoading) {
    return <div className="loading" />;
  }

  if (savedRoles.length > 0) {
    const liveRoles = [];
    const expiredRoles = [];
    savedRoles.forEach((role) => {
      if (role.daysToDeadline > 0) liveRoles.push(role);
      else expiredRoles.push(role);
    });
    return (
      <>
        <Row>
          <h1>Live Roles</h1>
          {liveRoles.map((role) => {
            return (
              <Colxx lg="6" className="my-5" key={role.id}>
                <SavedRoleCard role={role} />
              </Colxx>
            );
          })}
        </Row>
        <Row>
          <h1>Expired Roles</h1>
          {expiredRoles.map((role) => {
            return (
              <Colxx lg="6" className="my-5" key={role.id}>
                <ExpiredRoleCard role={role} />
              </Colxx>
            );
          })}
        </Row>
      </>
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
