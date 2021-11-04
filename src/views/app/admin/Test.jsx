/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Row,
  Card,
  CardBody,
  CardTitle,
  Button,
  CardSubtitle,
} from 'reactstrap';
import { Colxx, Separator } from '../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../containers/navs/Breadcrumb';
import { MultiSelect } from '../../../components/FormFields';

const Test = ({ match }) => {
  const { control, setValue, handleSubmit } = useForm();
  const tagsOptions = [
    {
      key: 0,
      label: 'test 1',
      value: 'test 1',
    },
    {
      key: 1,
      label: 'test 2',
      value: 'test 2',
    },
    {
      key: 2,
      label: 'test 3',
      value: 'test 3',
    },
    {
      key: 3,
      label: 'test 4',
      value: 'test 4',
    },
    {
      key: 4,
      label: 'test 5',
      value: 'test 5',
    },
  ];
  const [score, setScore] = useState(0);

  const onSubmit = async (data) => {
    const { candidateTags, companyTags } = data;
    if (companyTags && candidateTags) {
      const intersection = companyTags.filter((x) => candidateTags.includes(x));
      setScore(Math.round((intersection.length * 100) / companyTags.length));
    }
  };

  return (
    <>
      <Row>
        <Colxx xxs="12">
          <Breadcrumb heading="menu.test" match={match} />
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      <Row className="mb-4">
        <Colxx md="12" xl="6" className="mb-4 col-item">
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

        <Colxx md="12" xl="6" className="mb-4 col-item">
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
        <Colxx xxs="12" className="mb-4">
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
    </>
  );
};

export default Test;
