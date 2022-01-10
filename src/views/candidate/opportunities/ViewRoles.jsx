/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Row } from 'reactstrap';
import { Colxx, Separator } from '../../../components/common/CustomBootstrap';
import ViewRolesContainer from '../../../containers/candidate/ViewRolesContainer';

const ViewRoles = () => {
  return (
    <>
      <Row>
        <Colxx xxs="12">
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      <Row>
        <Colxx xxs="12" className="pl-0 pr-0 mb-5">
          <ViewRolesContainer />
        </Colxx>
      </Row>
    </>
  );
};

export default ViewRoles;
