import React, { useState } from 'react';
import { Row, Nav, NavItem, TabContent, TabPane } from 'reactstrap';
import { Colxx, Separator } from '../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../containers/navs/Breadcrumb';
import IntlMessages from '../../../helpers/IntlMessages';
import classnames from 'classnames';
import { NavLink } from 'react-router-dom';
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
