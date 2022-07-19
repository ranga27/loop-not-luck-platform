import React from 'react';
import { Row } from 'reactstrap';
import ApplicationsCard from '../../../components/cards/ApplicationsCard';
import { Colxx } from '../../../components/common/CustomBootstrap';
import IntlMessages from '../../../helpers/IntlMessages';

const AllApplications = ({ allApplications }) => {
  return (
    <Row>
      <h3 style={{ fontWeight: 'bold' }} className="mt-5">
        <IntlMessages id="pages.application-allApplications" />
      </h3>
      {allApplications.map((application) => {
        return (
          <Colxx lg="6" className="pt-4" key={application.id}>
            <ApplicationsCard application={application} />
          </Colxx>
        );
      })}
    </Row>
  );
};

export default AllApplications;
