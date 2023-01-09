import React from 'react';
import { Outlet } from 'react-router-dom';
import { Row } from 'reactstrap';
import { Colxx } from '../../../components/common/CustomBootstrap';

const AdminDashboard = () => {
  return (
    <>
      <Row>
        <Colxx xxs="12">
          <h1>ADMIN DASHBOARD</h1>
        </Colxx>
      </Row>
      <Outlet />
    </>
  );
};

export default AdminDashboard;
