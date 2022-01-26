/* eslint-disable import/no-extraneous-dependencies */
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
import { v4 as uuidv4 } from 'uuid';
import { useForm } from 'react-hook-form';
import { Colxx } from '../../components/common/CustomBootstrap';
import { sendJobsEmail } from '../../helpers/firebaseService';
import { TextInput } from '../../components/form/FormFields';
import {
  getCompanyIdFromFirestore,
  updateCompanyInFirebase,
} from '../../helpers/firestoreService';

const UpdateCompany = () => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      firstName: 'Sarang',
      email: 'sarang@nc.com',
      company: 'Netco',
      uid: '',
    },
  });
  const onSubmit = async (data) => {
    const uid = uuidv4();
    const { firstName, email } = data;
    const { companyId, users } = await getCompanyIdFromFirestore(data.company);
    // console.log('Company: ', companyData);
    updateCompanyInFirebase({
      companyId,
      users: { [`${uid}`]: { firstName, email }, ...users },
    });
  };
  return (
    <Colxx>
      <Card>
        <CardBody>
          <CardTitle>Update Company Data</CardTitle>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <TextInput name="firstName" label="First Name" control={control} />
            <TextInput name="email" label="Email" control={control} />
            <TextInput name="company" label="Company" control={control} />
            <Button color="primary" size="lg" className="mb-2" type="submit">
              Update
            </Button>
          </Form>
        </CardBody>
      </Card>
    </Colxx>
  );
};

export default UpdateCompany;
