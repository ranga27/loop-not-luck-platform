import React from 'react';
import { Row } from 'reactstrap';
import { Colxx, Separator } from '../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../containers/navs/Breadcrumb';
import ReviewRolesList from '../../../containers/opportunities/ReviewRolesList';
import RoleDetails from '../../../containers/opportunities/RoleDetails';

const ReviewRoles = ({ match }) => {
  return (
    <>
      <Row>
        <Colxx xxs="12">
          <Breadcrumb heading="menu.review" match={match} />
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      <Row>
        <Colxx lg="6" md="12" className="mb-4">
          <ReviewRolesList />
        </Colxx>
        <Colxx lg="6" md="12" className="mb-4">
          <RoleDetails />
        </Colxx>
      </Row>
    </>
  );
};

export default ReviewRoles;
