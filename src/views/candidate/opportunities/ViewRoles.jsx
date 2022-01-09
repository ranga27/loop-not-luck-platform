/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Row } from 'reactstrap';
import { useRouteMatch } from 'react-router-dom';
import { Colxx, Separator } from '../../../components/common/CustomBootstrap';
import ViewRolesContainer from '../../../containers/candidate/ViewRolesContainer';
import Breadcrumb from '../../../containers/navs/Breadcrumb';

const ViewRoles = () => {
  const match = useRouteMatch();
  return (
    <>
      <Row>
        <Colxx xxs="12">
          <Breadcrumb heading="menu.view-roles" match={match} />
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
