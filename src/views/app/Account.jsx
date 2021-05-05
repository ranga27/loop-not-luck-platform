import React from 'react';
import { Formik, Form, Field } from 'formik';
import {
  Row,
  Card,
  CardBody,
  CardTitle,
  Label,
  Button,
  FormGroup,
} from 'reactstrap';
import { Colxx } from '../../components/common/CustomBootstrap';
import IntlMessages from '../../helpers/IntlMessages';
import { getCurrentUser } from '../../helpers/Utils';
import { updateUserInFirestore } from '../../app/firestore/firestoreService';

const Account = () => {
  const { uid, firstName, lastName, email } = getCurrentUser();
  const initialValues = {
    firstName,
    lastName,
    email,
  };
  console.log(initialValues);
  const onSubmit = async (values, actions) => {
    try {
      updateUserInFirestore({ uid, ...values });
      actions.setSubmitting(false);
    } catch (error) {
      console.error(error);
      actions.setSubmitting(false);
    }
  };
  return (
    <Row className="mb-4">
      <Colxx xxs="12">
        <Card>
          <CardBody>
            <CardTitle>
              <IntlMessages id="forms.account-info" />
            </CardTitle>
            <Formik
              initialValues={initialValues}
              onSubmit={(values, actions) => onSubmit(values, actions)}
            >
              {() => (
                <Form className="av-tooltip tooltip-label-right">
                  <FormGroup className="mb-5">
                    <Label>First Name</Label>
                    <Field className="form-control" name="firstName" />
                  </FormGroup>

                  <FormGroup className="mb-5">
                    <Label>Last Name</Label>
                    <Field className="form-control" name="lastName" />
                  </FormGroup>

                  <FormGroup className="mb-5">
                    <Label>Email</Label>
                    <Field
                      className="form-control"
                      name="email"
                      type="email"
                      disabled
                    />
                  </FormGroup>

                  <Button color="primary" type="submit">
                    Submit
                  </Button>
                </Form>
              )}
            </Formik>
          </CardBody>
        </Card>
      </Colxx>
    </Row>
  );
};

export default Account;
