import React from 'react';
import { Row, Button, Card, CardBody, Badge } from 'reactstrap';
import ActiveApplicationCard from '../../components/cards/ActiveApplicationsCards';
import ExpiredApplicationsCard from '../../components/cards/ExpiredApplicationsCards';
import { Colxx } from '../../components/common/CustomBootstrap';
import data from './applicationData.json';

const Applications = () => {
  if (data.applications.length > 0) {
    const liveApplications = [];
    const expiredApplications = [];
    data.applications.forEach((application) => {
      if (application.status === 'active') liveApplications.push(application);
      else expiredApplications.push(application);
    });
    return (
      <>
        <Row>
          <h1>
            Live Applications{' '}
            <Badge color="primary" pill>
              {data.applications.length}
            </Badge>
          </h1>

          <div className="d-flex flex-row mx-5">
            <Button
              id="actionRequiredButton"
              color="danger"
              className="danger-button"
            >
              Action Required
            </Button>
            <Button
              id="allApplicationsButton"
              className="transparent-button text-muted shadow-md"
            >
              All Applications
            </Button>
          </div>
          {liveApplications.map((application) => {
            return (
              <Colxx lg="6" className="my-5" key={application.id}>
                <ActiveApplicationCard application={application} />
              </Colxx>
            );
          })}
        </Row>
        <Row>
          <h1>Expired Applications</h1>
          {expiredApplications.map((application) => {
            return (
              <Colxx lg="6" className="my-5" key={application.id}>
                <ExpiredApplicationsCard application={application} />
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
          <h3>Sorry, no applications for you yet</h3>
        </CardBody>
      </Card>
    </div>
  );
};

export default Applications;
