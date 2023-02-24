/* eslint-disable no-unused-vars */
import React from 'react';
import { Row } from 'reactstrap';
import { Colxx } from '../../../components/common/CustomBootstrap';
import RoleListContainer from '../../../containers/roles/RoleListContainer';

const ReviewRoles = () => {
  return (
    <Row>
      <Colxx xxs="12">
        <RoleListContainer />
      </Colxx>
    </Row>
  );
};

export default ReviewRoles;
