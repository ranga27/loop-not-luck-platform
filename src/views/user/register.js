import React, { useState, useEffect } from 'react';
import {
  Row,
  Card,
  CardTitle,
  FormGroup,
  Label,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { Formik, Form, Field } from 'formik';

import { registerUser } from '../../redux/actions';
import { NotificationManager } from '../../components/common/react-notifications';

import IntlMessages from '../../helpers/IntlMessages';
import { Colxx } from '../../components/common/CustomBootstrap';

const validatePassword = (value) => {
  let error;
  if (!value) {
    error = 'Please enter your password';
  } else if (value.length < 4) {
    error = 'Value must be longer than 3 characters';
  }
  return error;
};

const validateEmail = (value) => {
  let error;
  if (!value) {
    error = 'Please enter your email address';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    error = 'Invalid email address';
  }
  return error;
};

const Register = ({
  history,
  loading,
  error,
  currentUser,
  registerUserAction,
}) => {
  const [email] = useState('');
  const [password] = useState('');
  const [modalBasic, setModalBasic] = useState(false);
  useEffect(() => {
    if (error) {
      NotificationManager.warning(
        error,
        'Registration Error',
        3000,
        null,
        null,
        ''
      );
    } else if (!loading && currentUser === 'success') {
      /*       NotificationManager.success(
        'Please verify your email',
        'Verify email.',
        -0,
        null,
        null,
        ''
      ); */
      setModalBasic(true);
    }
  }, [error, loading, currentUser]);

  const onUserRegister = (values) => {
    if (!loading) {
      if (values.email !== '' && values.password !== '') {
        registerUserAction(values, history);
      }
    }
  };

  const initialValues = { email, password };

  return (
    <Row className="h-100">
      <Colxx xxs="12" md="10" className="mx-auto my-auto">
        <Card className="auth-card">
          <div className="position-relative image-side ">
            <p className="text-white h2">Loop Not Luck</p>
            <p className="white mb-0">
              Please use this form to register. <br />
              If you are a member, please{' '}
              <NavLink to="/user/login" className="white">
                login
              </NavLink>
              .
            </p>
          </div>
          <div className="form-side">
            <NavLink to="/" className="white">
              <span className="logo-single" />
            </NavLink>
            <CardTitle className="mb-4">
              <IntlMessages id="user.register" />
            </CardTitle>

            <Formik initialValues={initialValues} onSubmit={onUserRegister}>
              {({ errors, touched }) => (
                <Form className="av-tooltip tooltip-label-bottom">
                  <FormGroup className="form-group has-float-label  mb-4">
                    <Label>
                      <IntlMessages id="user.email" />
                    </Label>
                    <Field
                      className="form-control"
                      name="email"
                      validate={validateEmail}
                    />
                    {errors.email && touched.email && (
                      <div className="invalid-feedback d-block">
                        {errors.email}
                      </div>
                    )}{' '}
                  </FormGroup>

                  <FormGroup className="form-group has-float-label  mb-4">
                    <Label>
                      <IntlMessages id="user.password" />
                    </Label>
                    <Field
                      className="form-control"
                      type="password"
                      name="password"
                      validate={validatePassword}
                    />
                    {errors.password && touched.password && (
                      <div className="invalid-feedback d-block">
                        {errors.password}
                      </div>
                    )}{' '}
                  </FormGroup>

                  <div className="d-flex justify-content-end align-items-center">
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
                        <IntlMessages id="user.register-button" />
                      </span>
                    </Button>
                    <Modal
                      isOpen={modalBasic}
                      toggle={() => setModalBasic(!modalBasic)}
                    >
                      <ModalHeader>
                        <IntlMessages id="modal.modal-title" />
                      </ModalHeader>
                      <ModalBody>
                        E-Mail confirmation sent: Check your E-Mails (Spam
                        folder included) for a confirmation E-Mail. Login once
                        you confirmed your E-Mail.
                      </ModalBody>
                      <ModalFooter>
                        <Button
                          color="secondary"
                          onClick={() => setModalBasic(false)}
                        >
                          Close
                        </Button>
                      </ModalFooter>
                    </Modal>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </Card>
      </Colxx>
    </Row>
  );
};
const mapStateToProps = ({ authUser }) => {
  const { loading, error, currentUser } = authUser;
  return { loading, error, currentUser };
};

export default connect(mapStateToProps, {
  registerUserAction: registerUser,
})(Register);
