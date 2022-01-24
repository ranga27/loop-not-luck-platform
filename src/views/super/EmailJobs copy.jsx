/* eslint-disable no-unused-vars */
import React from 'react';
import {
  Card,
  CardBody,
  Button,
  Form,
  FormGroup,
  Input,
  CardTitle,
} from 'reactstrap';
import { useForm } from 'react-hook-form';
import { Colxx } from '../../components/common/CustomBootstrap';
import { sendJobsEmail } from '../../helpers/firebaseService';
import { TextInput } from '../../components/form/FormFields';

const EmailJobs = () => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      firstName: '',
      email: '',
    },
  });
  const onSubmit = async (data) => {
    console.log(data);
    await sendJobsEmail(data);
  };
  return (
    <Colxx>
      <Card>
        <CardBody>
          <CardTitle>Test Email Cloud Functions</CardTitle>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <FormGroup>
              <TextInput
                name="firstName"
                label="First Name"
                control={control}
              />
            </FormGroup>
            <FormGroup>
              <TextInput name="email" label="Email" control={control} />
            </FormGroup>

            <Button color="primary" size="lg" className="mb-2" type="submit">
              Send Email
            </Button>
          </Form>
        </CardBody>
      </Card>
    </Colxx>
  );
};

export default EmailJobs;
