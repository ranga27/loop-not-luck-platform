import React, { useState, useEffect } from 'react';
import { Label, FormGroup } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
// TODO: change to RHF smartform
import { Formik, Form, Field } from 'formik';

import { NotificationManager } from '../../components/common/react-notifications';

import { loginUser } from '../../redux/actions';
import IntlMessages from '../../helpers/IntlMessages';
import Layout from './layout';
import AuthButton from './AuthButton';

// TODO: check for email verified?
const validatePassword = (value) => {
  let error;
  if (!value) {
    error = 'Please enter your password';
  } else if (value.length < 8) {
    error = 'Value must be minimum 8 characters';
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
const Login = ({ history, loading, error, loginUserAction }) => {
  const [email] = useState('');
  const [password] = useState('');

  useEffect(() => {
    if (error) {
      NotificationManager.warning(error, 'Login Error', 3000, null, null, '');
    }
  }, [error]);

  const onUserLogin = (values) => {
    if (!loading) {
      if (values.email !== '' && values.password !== '') {
        loginUserAction(values, history);
      }
    }
  };
  const initialValues = { email, password };

  return (
    <Layout cardTitle="user.login-title">
      <Formik initialValues={initialValues} onSubmit={onUserLogin}>
        {({ errors, touched }) => (
          <Form className="av-tooltip tooltip-label-bottom">
            <FormGroup className="form-group has-float-label">
              <Label>
                <IntlMessages id="user.email" />
              </Label>
              <Field
                className="form-control"
                name="email"
                validate={validateEmail}
              />
              {errors.email && touched.email && (
                <div className="invalid-feedback d-block">{errors.email}</div>
              )}
            </FormGroup>
            <FormGroup className="form-group has-float-label">
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
              )}
            </FormGroup>
            <div className="d-flex justify-content-between align-items-center">
              <NavLink to="/user/forgot-password">
                <IntlMessages id="user.forgot-password-question" />
              </NavLink>
              <AuthButton loading={loading} label="user.login-button" />
            </div>
          </Form>
        )}
      </Formik>
      <p className="mb-0">
        <br />
        If you are not a member, please{' '}
        <NavLink to="/user/register" style={{ color: 'green' }}>
          register
        </NavLink>
        .
      </p>
    </Layout>
  );
};
const mapStateToProps = ({ authUser }) => {
  const { loading, error } = authUser;
  return { loading, error };
};

export default connect(mapStateToProps, {
  loginUserAction: loginUser,
})(Login);
