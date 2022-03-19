/* eslint-disable no-unused-vars */
import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Row, Button } from 'reactstrap';
import { Colxx } from '../../../components/common/CustomBootstrap';

const Companies = () => {
  return (
    <>
      <Row>
        <Colxx xxs="12">
          <h1>Manage Companies</h1>
          <div className="text-zero top-right-button-container">
            <Button
              tag={Link}
              to="addcompany"
              color="primary"
              size="lg"
              className="top-right-button mb-4"
            >
              ADD NEW
            </Button>
          </div>
        </Colxx>
      </Row>
      <Outlet />
    </>
  );
};

export default Companies;
