/* eslint-disable no-unused-vars */
import React from 'react';
import { Row } from 'reactstrap';
import { Colxx } from '../../components/common/CustomBootstrap';
import RoleListContainer from '../../containers/roles/RoleListContainer';
import RoleDetailsContainer from '../../containers/roles/RoleDetailsContainer';

const ReviewRoles = () => {
  return (
    <Row>
      <Colxx lg="6" md="12" className="mb-4">
        <RoleListContainer />
      </Colxx>
      <Colxx lg="6" md="12" className="mb-4">
        <RoleDetailsContainer />
      </Colxx>
    </Row>
  );
};

export default ReviewRoles;
