import React, { useEffect, useState } from 'react';
import { Row, Card, CardBody, Button, CardTitle } from 'reactstrap';
import { Colxx, Separator } from '../../components/common/CustomBootstrap';
import {
  fetchOpportunitiesFromFirestore,
  setRoleInFirestore,
} from '../../helpers/firestoreService';
import IntlMessages from '../../helpers/IntlMessages';
import EmailJobs from './EmailJobs';
import TestAlgorithm from './TestAlgorithm';
import UpdateCompany from './UpdateCompany';

const Test = () => {
  const [roles, setRoles] = useState([]);
  useEffect(() => {
    const fetchOpportunitites = async () => {
      // TODO: avoid multiple firestore reads, keep role list updated via a listener
      // TODO: add logic for no roles found
      const results = await fetchOpportunitiesFromFirestore();
      setRoles(results);
    };
    fetchOpportunitites();
  }, []);

  const addRoleInFirestore = async (role) => {
    console.log(`Adding role: ${role.id}`);
    /* addRoleInUserDoc('XWqscmEUEwbFvlN4mHPJl5cFtH63', {
      ...role,
      // TODO: implement matching algorithm based on tags in documents
      matchedScore: Math.floor(Math.random() * 99),
    }); */
    await setRoleInFirestore(role);
  };

  const addRoles = async () => {
    if (roles) {
      roles.forEach(addRoleInFirestore);
    }
  };
  console.log('Fetched roles: ', roles);
  return (
    <>
      <Row>
        <Colxx>
          <h1>
            <IntlMessages id="menu.test" />
          </h1>
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      <TestAlgorithm />
      <Row>
        <Colxx>
          <Card>
            <CardBody>
              <CardTitle>Add roles collection</CardTitle>
              <Button
                color="primary"
                size="lg"
                className="mb-2"
                type="submit"
                onClick={addRoles}
                disabled={!roles}
              >
                Add Roles
              </Button>
            </CardBody>
          </Card>
        </Colxx>
        <EmailJobs />
        <UpdateCompany />
      </Row>
    </>
  );
};

export default Test;
