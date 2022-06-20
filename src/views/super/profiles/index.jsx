import React from 'react';
import { Outlet } from 'react-router-dom';
import { Row } from 'reactstrap';
import { Colxx } from '../../../components/common/CustomBootstrap';

const UserProfiles = () => {
  return (
    <>
      <Row>
        <Colxx xxs="12">
          <h1>Users List</h1>
        </Colxx>
      </Row>
      <Outlet />
    </>
  );
};

export default UserProfiles;
