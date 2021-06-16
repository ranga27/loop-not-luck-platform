/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Row, Button } from 'reactstrap';
import { adminRoot } from '../../../constants/defaultValues';
import { Colxx, Separator } from '../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../containers/navs/Breadcrumb';
import CompaniesContainer from '../../../containers/CompaniesContainer';

const Companies = ({ match }) => {
  return (
    <>
      <Row>
        <Colxx xxs="12">
          <Breadcrumb heading="menu.companies" match={match} />
          <div className="text-zero top-right-button-container">
            <Button
              tag={Link}
              to={`${adminRoot}/admin/addcompany`}
              color="primary"
              size="lg"
              className="top-right-button"
            >
              ADD NEW
            </Button>
          </div>
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      <Row>
        <Colxx xxs="12" className="mb-4">
          <CompaniesContainer />
        </Colxx>
      </Row>
    </>
  );
};

export default Companies;
