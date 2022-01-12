import React from 'react';
import { Row } from 'reactstrap';
import { Colxx } from '../../../components/common/CustomBootstrap';
import ViewRolesContainer from '../../../containers/candidate/ViewRolesContainer';

const ViewRoles = () => {
  return (
    <Row>
      <Colxx xxs="12" className="pl-0 pr-0 mb-5">
        <ViewRolesContainer />
      </Colxx>
    </Row>
  );
};

export default ViewRoles;
