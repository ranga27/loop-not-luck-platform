import React from 'react';
import { Row } from 'reactstrap';
import { Colxx, Separator } from '../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../containers/navs/Breadcrumb';
import OpenRoleStats from '../../../containers/opportunities/OpenRoleStats';

const OpenRolesPage = ({ match }) => {
  return (
    <>
      <Row>
        <Colxx xxs="12">
          <Breadcrumb heading="menu.open" match={match} />
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      <OpenRoleStats />
    </>
  );
};

export default OpenRolesPage;
