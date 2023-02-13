import React, { useState } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { Button, Card, CardBody, CardTitle, Row } from 'reactstrap';
import { collection, query, where, orderBy } from 'firebase/firestore';
import { useFirestoreQuery } from '@react-query-firebase/firestore';
import { firestore } from '../../../helpers';
import {
  formatDateInArray,
  getOnboardedUsers,
  getUsersNotOnboarded,
  getUsersOnboardedWithCv,
  getUsersOnboardedWithoutCv,
  getUsersWithoutCompletedProfile,
  getUsersWithProfileCompleted,
  signUpsMinusLoop,
  signUpsThisWeek,
  signUpsToday,
} from '../../../helpers/Utils';
import { Colxx } from '../../../components/common/CustomBootstrap';
import { getUpdatedMatchedRolesInDB } from '../../../helpers/firebaseService';
// import NestedMetrics from './NestedMetrics';

const ManageProfiles = () => {
  const [loading, setFunctionLoading] = useState(false);
  const alert = withReactContent(Swal);
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

  const candidates = usersList.filter(
    (user) => !user.email.endsWith('@loopnotluck.com')
  );

  const usersToRefresh = usersList.filter(
    (x) =>
      x.hasCompletedProfile &&
      x.isOnboarded &&
      !x.email.endsWith('@loopnotluck.com')
  );

  const onRefreshRoles = async () => {
    setFunctionLoading(true);
    await usersToRefresh.map((user) => {
      return getUpdatedMatchedRolesInDB(user.id).then(() => {
        alert.fire({
          title: 'Awesome!',
          text: 'The refreshing of all loop candidates matched roles is now running.',
          icon: 'success',
          confirmButtonColor: '#3085d6',
          iconColor: '#3085d6',
        });
      });
    });
    setFunctionLoading(false);
  };

  if (loading) {
    return <div className="loading" />;
  }

  return (
    <div>
      <div className="my-4">
        <Button onClick={() => onRefreshRoles()} color="link">
          <span
            style={{ color: '#F7B919' }}
            data-cy="my-application-show-details-button"
          >
            Refresh All Candidates Matched Roles
          </span>
        </Button>
        <span>(Please click only once as it works in the background)</span>
      </div>
      <Row md="2">
        <Colxx lg="6" className="mb-4">
          <Card className="mb-4">
            <CardBody>
              <div className="text-center">
                <CardTitle className="mb-1">
                  Total number of candidates who have signed up
                </CardTitle>
                <h3 style={{ fontWeight: 'bold' }}>
                  {signUpsMinusLoop(candidates).length}
                </h3>
              </div>
            </CardBody>
          </Card>
        </Colxx>
        <Colxx lg="6" className="mb-4">
          <Card className="mb-4">
            <CardBody>
              <div className="text-center">
                <CardTitle className="mb-1">
                  Total number of candidates who have signed up today
                </CardTitle>
                <h3 style={{ fontWeight: 'bold' }}>
                  {signUpsToday(candidates).length}
                </h3>
              </div>
            </CardBody>
          </Card>
        </Colxx>
        <Colxx lg="6" className="mb-4">
          <Card className="mb-4">
            <CardBody>
              <div className="text-center">
                <CardTitle className="mb-1">
                  Total number of candidates who have signed up this week
                </CardTitle>
                <h3 style={{ fontWeight: 'bold' }}>
                  {signUpsThisWeek(candidates).length}
                </h3>
              </div>
            </CardBody>
          </Card>
        </Colxx>
        <Colxx lg="6" className="mb-4">
          <Card className="mb-4">
            <CardBody>
              <div className="text-center">
                <CardTitle className="mb-1">
                  Total number of candidates who have completed onboarding
                </CardTitle>
                <h3 style={{ fontWeight: 'bold' }}>
                  {getOnboardedUsers(candidates).length}
                </h3>
              </div>
            </CardBody>
          </Card>
        </Colxx>
        <Colxx lg="6" className="mb-4">
          <Card className="mb-4">
            <CardBody>
              <div className="text-center">
                <CardTitle className="mb-1">
                  Total number of candidates who have not completed onboarding
                </CardTitle>
                <h3 style={{ fontWeight: 'bold' }}>
                  {getUsersNotOnboarded(candidates).length}
                </h3>
              </div>
            </CardBody>
          </Card>
        </Colxx>
        <Colxx lg="6" className="mb-4">
          <Card className="mb-4">
            <CardBody>
              <div className="text-center">
                <CardTitle className="mb-1">
                  Total number of candidates who have completed their profile
                </CardTitle>
                <h3 style={{ fontWeight: 'bold' }}>
                  {getUsersWithProfileCompleted(candidates).length}
                </h3>
              </div>
            </CardBody>
          </Card>
        </Colxx>
        <Colxx lg="6" className="mb-4">
          <Card className="mb-4">
            <CardBody>
              <div className="text-center">
                <CardTitle className="mb-1">
                  Total number of candidates who have not completed their
                  profile
                </CardTitle>
                <h3 style={{ fontWeight: 'bold' }}>
                  {getUsersWithoutCompletedProfile(candidates).length}
                </h3>
              </div>
            </CardBody>
          </Card>
        </Colxx>
        <Colxx lg="6" className="mb-4">
          <Card className="mb-4">
            <CardBody>
              <div className="text-center">
                <CardTitle className="mb-1">
                  Onboarding completed without CV upload
                </CardTitle>
                <h3 style={{ fontWeight: 'bold' }}>
                  {getUsersOnboardedWithoutCv(candidates).length}
                </h3>
              </div>
            </CardBody>
          </Card>
        </Colxx>

        <Colxx lg="6" className="mb-4">
          <Card className="mb-4">
            <CardBody>
              <div className="text-center">
                <CardTitle className="mb-1">
                  Onboarding completed with CV upload
                </CardTitle>
                <h3 style={{ fontWeight: 'bold' }}>
                  {getUsersOnboardedWithCv(candidates).length}
                </h3>
              </div>
            </CardBody>
          </Card>
        </Colxx>
      </Row>
      {/* <NestedMetrics users={usersList} /> */}
    </div>
  );
};

export default ManageProfiles;
