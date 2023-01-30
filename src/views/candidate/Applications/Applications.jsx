import React, { useState } from 'react';
import { Row, Button, Card, CardBody, Badge } from 'reactstrap';
import { useQuery } from 'react-query';
import { useFirestoreQuery } from '@react-query-firebase/firestore';
import { collection, query } from 'firebase/firestore';
import { firestore } from '../../../helpers/Firebase';
import { formatDateInArray, getDaysToDeadline } from '../../../helpers/Utils';
import SectionedApplications from './SectionedApplications';
import AllApplications from './AllApplications';
import IntlMessages from '../../../helpers/IntlMessages';

const Applications = () => {
  const [activeTab, setActiveTab] = useState('tab1');
  const user = useQuery(['userAuth']);
  const { uid } = user.data;
  const todaysDate = new Date();
  const { isLoading, data: roles } = useFirestoreQuery(
    ['companyMatchedRoles'],
    query(collection(firestore, `users/${uid}/companyMatchedRoles`)),
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

  const tabs = [
    { text: 'Action Required', current: true },
    { text: 'All Applications', current: false },
  ];

  const handleActionTab = async () => {
    tabs[0].current = true;
    setActiveTab('tab1');
  };

  const handleAllApplicationTab = async () => {
    tabs[0].current = false;
    tabs[1].current = true;
    setActiveTab('tab2');
  };

  if (isLoading) {
    return <div className="loading" />;
  }

  const appliedRoles = roles.filter((role) => role.applied);

  if (appliedRoles.length > 0) {
    const liveApplications = [];
    const expiredApplications = [];
    appliedRoles.forEach((role) => {
      const roleDeadline = new Date(role.deadline);
      if (roleDeadline > todaysDate) liveApplications.push(role);
      else expiredApplications.push(role);
    });

    return (
      <>
        <Row>
          <h3 style={{ fontWeight: 'bold' }}>
            <IntlMessages id="pages.application-applications" />
            <Badge color="primary" pill className="mx-2">
              {appliedRoles.length}
            </Badge>
          </h3>

          <div className="d-flex flex-row">
            <Button
              id="actionRequiredButton"
              color="danger"
              className="danger-button mr-2 pr-2"
              onClick={(e) => handleActionTab(e)}
              data-cy="my-application-action-reqiquired-button"
            >
              {tabs[0].text}
            </Button>
            <Button
              id="allApplicationsButton"
              color="link"
              onClick={(e) => handleAllApplicationTab(e)}
              className="transparent-button text-muted"
              data-cy="my-application-all-application-button"
            >
              {tabs[1].text}
            </Button>
          </div>
        </Row>
        <div>
          {activeTab === 'tab1' ? (
            <SectionedApplications
              liveApplications={liveApplications}
              expiredApplications={expiredApplications}
            />
          ) : (
            <AllApplications allApplications={appliedRoles} />
          )}
        </div>
      </>
    );
  }

  return (
    <div>
      <Card>
        <CardBody>
          <h3>Sorry, you have not applied to any roles yet!</h3>
        </CardBody>
      </Card>
    </div>
  );
};

export default Applications;
