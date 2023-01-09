import React from 'react';
import { Card, CardBody, CardTitle, Row } from 'reactstrap';
import { collection, query, where, orderBy } from 'firebase/firestore';
import { useFirestoreQuery } from '@react-query-firebase/firestore';
import { firestore } from '../../../helpers';
import { formatDateInArray } from '../../../helpers/Utils';
import { Colxx } from '../../../components/common/CustomBootstrap';
// import NestedMetrics from './NestedMetrics';

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

  const isOnboarded = usersList.filter((x) => x.isOnboarded);
  const isNotOnboarded = usersList.filter((x) => !x.isOnboarded);

  const onboardedWithCV = usersList.filter(
    (x) => x.cvUploadDate !== null || x.cvUploadDate !== undefined
  );
  const onboardedWithoutCV = usersList.filter((x) => x.cvUploadDate === null);
  const profileCompleted = usersList.filter((x) => x.hasCompletedProfile);
  const profileNotCompleted = usersList.filter((x) => !x.hasCompletedProfile);

  return (
    <div>
      <Row md="2">
        <Colxx lg="6" className="mb-4">
          <Card className="mb-4">
            <CardBody>
              <div className="text-center">
                <CardTitle className="mb-1">
                  Total number of candidates who have signed up
                </CardTitle>
                <h3 style={{ fontWeight: 'bold' }}>{usersList.length}</h3>
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
                <h3 style={{ fontWeight: 'bold' }}>{isOnboarded.length}</h3>
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
                <h3 style={{ fontWeight: 'bold' }}>{isNotOnboarded.length}</h3>
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
                  {profileCompleted.length}
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
                  {profileNotCompleted.length}
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
                  {onboardedWithoutCV.length}
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
                <h3 style={{ fontWeight: 'bold' }}>{onboardedWithCV.length}</h3>
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
