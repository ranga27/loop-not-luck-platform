/* eslint-disable no-unused-vars */
import React from 'react';
import { Row } from 'reactstrap';
import { Colxx, Separator } from '../../components/common/CustomBootstrap';
import RoleListContainer from '../../containers/opportunities/RoleListContainer';
import RoleDetails from '../../containers/opportunities/RoleDetails';

const ReviewRoles = () => {
  return (
    <>
      <Row>
        <Colxx xxs="12">
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      <Row>
        <Colxx lg="6" md="12" className="mb-4">
          <RoleListContainer />
        </Colxx>
        <Colxx lg="6" md="12" className="mb-4">
          {/*  <RoleDetails /> */}
        </Colxx>
      </Row>
    </>
  );
};

export default ReviewRoles;
