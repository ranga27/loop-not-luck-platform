/* eslint-disable no-unused-vars */
import React from 'react';
import { Card, CardBody, Row } from 'reactstrap';
import { useQuery } from 'react-query';
import { NavLink } from 'react-router-dom';
import { Colxx } from '../../components/common/CustomBootstrap';
import ViewRolesContainer from '../../containers/candidate/ViewRolesContainer';

const ViewRoles = () => {
  const userDoc = useQuery('userDoc');
  if (userDoc.isLoading) {
    return <div className="loading" />;
  }

  if (userDoc.data) {
    if (userDoc.data.hasCompletedProfile) {
      return (
        <Row>
          <Colxx xxs="12" className="pl-0 pr-0 mb-5">
            <ViewRolesContainer />
          </Colxx>
        </Row>
      );
    }
    return (
      <div>
        <Card>
          <CardBody>
            <h3>
              {userDoc.data.firstName}, please complete your profile to view
              roles! Click{' '}
              <NavLink to="/app/account" style={{ color: 'green' }}>
                here
              </NavLink>{' '}
              to complete your profile.
            </h3>
          </CardBody>
        </Card>
      </div>
    );
  }
  return <div />;
};

export default ViewRoles;
