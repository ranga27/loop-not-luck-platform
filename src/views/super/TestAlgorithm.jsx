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
import { Colxx } from '../../components/common/CustomBootstrap';
import { MultiSelect } from '../../components/form/FormFields';
import { tagsOptions } from './tagsOptions';

const TestAlgorithm = () => {
  const { control, setValue, handleSubmit, clearErrors } = useForm();
  const [score, setScore] = useState(0);

  const onSubmit = async (data) => {
    const { candidateTags, companyTags } = data;
    if (companyTags && candidateTags) {
      const intersection = companyTags.filter((x) => candidateTags.includes(x));
      setScore(Math.round((intersection.length * 100) / companyTags.length));
    }
  };
  return (
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
              defaultValue={tagsOptions}
              clearErrors={clearErrors}
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
              defaultValue={tagsOptions}
              clearErrors={clearErrors}
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
  );
};

export default TestAlgorithm;
