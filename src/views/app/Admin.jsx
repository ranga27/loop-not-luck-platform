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
import { useSelector, useDispatch } from 'react-redux';
import { Colxx } from '../../components/common/CustomBootstrap';
import IntlMessages from '../../helpers/IntlMessages';
import { updateUser } from '../../redux/actions';

const Admin = () => {
  const dispatch = useDispatch();
  const { loading, currentUser } = useSelector((state) => state.authUser);
  const { uid, firstName, lastName, email } = currentUser;
  const initialValues = {
    firstName,
    lastName,
    email,
  };
  const onSubmit = async (values, actions) => {
    try {
      dispatch(updateUser({ uid, ...values }));
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

                  <Button
                    color="primary"
                    className={`btn-shadow btn-multiple-state ${
                      loading ? 'show-spinner' : ''
                    }`}
                    size="lg"
                  >
                    <span className="spinner d-inline-block">
                      <span className="bounce1" />
                      <span className="bounce2" />
                      <span className="bounce3" />
                    </span>
                    <span className="label">
                      <IntlMessages id="forms.submit" />
                    </span>
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

export default Admin;
