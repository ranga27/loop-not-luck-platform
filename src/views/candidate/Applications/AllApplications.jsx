import React from 'react';
import { Row } from 'reactstrap';
import ApplicationsCard from '../../../components/cards/ApplicationsCard';
import { Colxx } from '../../../components/common/CustomBootstrap';
import IntlMessages from '../../../helpers/IntlMessages';

const AllApplications = ({ allApplications }) => {
  return (
    <Row>
      <h1 className="mt-5">
        <IntlMessages id="pages.application-allApplications" />
      </h1>
      {allApplications.map((application) => {
        return (
          <Colxx lg="6" className="my-5" key={application.id}>
            <ApplicationsCard application={application} />
          </Colxx>
        );
      })}
    </Row>
  );
};

export default AllApplications;
