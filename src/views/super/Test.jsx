/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import {
  Row,
  Card,
  CardBody,
  CardTitle,
  Button,
  CardSubtitle,
} from 'reactstrap';
import { getRoles } from '../../redux/actions';
import { Colxx, Separator } from '../../components/common/CustomBootstrap';
import { MultiSelect } from '../../components/form/FormFields';
import {
  addRoleInUserDoc,
  updateCompanyInFirestore,
} from '../../helpers/firestoreService';
import IntlMessages from '../../helpers/IntlMessages';
import { tagsOptions } from './tagsOptions';
import EmailJobs from './EmailJobs';

const Test = () => {
  const { roles } = useSelector((state) => state.roles);
  const dispatch = useDispatch();

  const { control, setValue, handleSubmit } = useForm();
  const [score, setScore] = useState(0);

  const onSubmit = async (data) => {
    const { candidateTags, companyTags } = data;
    if (companyTags && candidateTags) {
      const intersection = companyTags.filter((x) => candidateTags.includes(x));
      setScore(Math.round((intersection.length * 100) / companyTags.length));
    }
  };

  useEffect(() => {
    const fetchRoles = async () => {
      // TODO: avoid multiple firestore reads, keep role list updated via a listener
      // TODO: add logic for no roles found
      dispatch(getRoles('XWqscmEUEwbFvlN4mHPJl5cFtH63'));
    };
    // fetchRoles();
    const getCompanyId = async () => {
      const companyId = await updateCompanyInFirestore('Baby Swim');
      console.log('Company Id: ', companyId);
      return companyId;
    };
    getCompanyId();
  }, [dispatch]);

  const addRoleInFirestore = (role) => {
    console.log(`Adding role: ${role.id}`);
    addRoleInUserDoc('XWqscmEUEwbFvlN4mHPJl5cFtH63', {
      ...role,
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
      <Row className="mb-4">
        <Colxx className="mb-4 col-item">
          <Card>
            <CardBody>
              <CardTitle>Candidate Tags</CardTitle>
              <MultiSelect
                name="candidateTags"
                control={control}
                options={tagsOptions}
                setValue={setValue}
              />
            </CardBody>
          </Card>
        </Colxx>

        <Colxx className="mb-4 col-item">
          <Card>
            <CardBody>
              <CardTitle>Company Tags</CardTitle>
              <MultiSelect
                name="companyTags"
                control={control}
                options={tagsOptions}
                setValue={setValue}
              />
            </CardBody>
          </Card>
        </Colxx>
        <Colxx className="mb-4">
          <Card>
            <CardBody>
              <CardTitle>Run Matching & Scoring Algorithm</CardTitle>
              <CardSubtitle>Candidate Matching Score: {score}%</CardSubtitle>
              <Button
                color="primary"
                size="lg"
                className="mb-2"
                type="submit"
                onClick={handleSubmit(onSubmit)}
              >
                Run Algorithm
              </Button>
            </CardBody>
          </Card>
        </Colxx>
      </Row>
      <Row>
        <Colxx>
          <Card>
            <CardBody>
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
      </Row>
    </>
  );
};

export default Test;
