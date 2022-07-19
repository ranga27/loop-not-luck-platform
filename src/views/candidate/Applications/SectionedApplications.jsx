import React from 'react';
import { Row, Card, CardBody } from 'reactstrap';
import ApplicationsCard from '../../../components/cards/ApplicationsCard';
import { Colxx } from '../../../components/common/CustomBootstrap';
import IntlMessages from '../../../helpers/IntlMessages';

const SectionedApplications = ({ liveApplications, expiredApplications }) => {
  return (
    <>
      <Row>
        <h3 style={{ fontWeight: 'bold' }} className="mt-5">
          <IntlMessages id="pages.application-liveApplications" />
        </h3>
        {liveApplications.length !== 0 ? (
          liveApplications.map((application) => {
            return (
              <Colxx lg="6" className="pt-4" key={application.id}>
                <ApplicationsCard application={application} />
              </Colxx>
            );
          })
        ) : (
          <div>
            <Card className="my-5">
              <CardBody>
                <h3>Sorry, all your applications have expired.</h3>
              </CardBody>
            </Card>
          </div>
        )}
      </Row>
      <Row>
        <h3 style={{ fontWeight: 'bold' }} className="mt-5">
          Expired Applications
        </h3>
        {expiredApplications.map((application) => {
          return (
            <Colxx lg="6" className="pt-3" key={application.id}>
              <div className="pt-3">
                <ApplicationsCard application={application} />
              </div>
            </Colxx>
          );
        })}
      </Row>
    </>
  );
};

export default SectionedApplications;
