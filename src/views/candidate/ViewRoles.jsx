/* eslint-disable no-unused-vars */
import React from 'react';
import { Row } from 'reactstrap';
import { useQuery } from 'react-query';
import { Colxx } from '../../components/common/CustomBootstrap';
import ViewRolesContainer from '../../containers/candidate/ViewRolesContainer';

const ViewRoles = () => {
  const userDoc = useQuery('userDoc');
  if (userDoc.isLoading) {
    return <div className="loading" />;
  }
  if (userDoc.data) {
    return <div>Welcome {userDoc.data.firstName}!</div>;
  }
  return (
    <Row>
      <Colxx xxs="12" className="pl-0 pr-0 mb-5">
        <ViewRolesContainer />
      </Colxx>
    </Row>
  );
};

export default ViewRoles;
