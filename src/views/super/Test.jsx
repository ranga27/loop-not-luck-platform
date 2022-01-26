/* eslint-disable react/function-component-definition */
/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Card, CardBody, Button, CardTitle } from 'reactstrap';
import { getRoles } from '../../redux/actions';
import { Colxx, Separator } from '../../components/common/CustomBootstrap';
import { addRoleInUserDoc } from '../../helpers/firestoreService';
import IntlMessages from '../../helpers/IntlMessages';
import EmailJobs from './EmailJobs';
import TestAlgorithm from './TestAlgorithm';
import UpdateCompany from './UpdateCompany';

const Test = () => {
  const { roles } = useSelector((state) => state.roles);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchRoles = async () => {
      // TODO: avoid multiple firestore reads, keep role list updated via a listener
      // TODO: add logic for no roles found
      dispatch(getRoles('XWqscmEUEwbFvlN4mHPJl5cFtH63'));
    };
    // fetchRoles();
  }, [dispatch]);

  const addRoleInFirestore = (role) => {
    console.log(`Adding role: ${role.id}`);
    addRoleInUserDoc('XWqscmEUEwbFvlN4mHPJl5cFtH63', {
      ...role,
      // TODO: implement matching algorithm based on tags in documents
      matchedScore: Math.floor(Math.random() * 99),
    });
  };

  const addRoles = async () => {
    if (roles) {
      roles.forEach(addRoleInFirestore);
    }
  };

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
              <CardTitle>Match and Add roles to Candidates</CardTitle>
              <Button
                color="primary"
                size="lg"
                className="mb-2"
                type="submit"
                onClick={addRoles}
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
