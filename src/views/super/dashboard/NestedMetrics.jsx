/* eslint-disable no-restricted-syntax */
import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardTitle, Row } from 'reactstrap';
import { fetchUserMatchedRolesFromFirestore } from '../../../helpers/firestoreService';
import { Colxx } from '../../../components/common/CustomBootstrap';

const NestedMetrics = ({ users }) => {
  console.log(users);
  const [userRoles, setUsersRoles] = useState([]);
  useEffect(() => {
    fetchUserMatchedRolesFromFirestore(users).then((results) => {
      if (results.length > 0) {
        setUsersRoles(results);
      }
      return null;
    });
  }, [users]);

  console.log(userRoles);

  return (
    <>
      <p>Hello</p>
      <Row md="2">
        <Colxx lg="6" className="mb-4">
          <Card className="mb-4">
            <CardBody>
              <div className="text-center">
                <CardTitle className="mb-1">
                  Total number of candidates who have signed up
                </CardTitle>
                <h3 style={{ fontWeight: 'bold' }}>usersList.length</h3>
              </div>
            </CardBody>
          </Card>
        </Colxx>
      </Row>
    </>
  );
};

export default NestedMetrics;
