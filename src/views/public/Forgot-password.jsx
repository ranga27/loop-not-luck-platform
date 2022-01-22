/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Label, FormGroup, CardSubtitle } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import { connect, useDispatch, useSelector } from 'react-redux';
import IntlMessages from '../../helpers/IntlMessages';
import AuthButton from './AuthButton';
import Layout from './layout';
import { forgotPassword } from '../../redux/auth/authSlice';

const validateEmail = (value) => {
  let error;
  if (!value) {
    error = 'Please enter your email address';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    error = 'Invalid email address';
  }
  return error;
};

const ForgotPassword = ({ history }) => {
  const { forgotUserMail, loading, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [email] = useState('');

  const onForgotPassword = (values) => {
    if (!loading) {
      if (values.email !== '') {
        // TODO: remove history
        dispatch(forgotPassword(values, history));
      }
    }
  };
  /*
  useEffect(() => {
    if (error) {
       NotificationManager.warning(
        error,
        'Forgot Password Error',
        3000,
        null,
        null,
        '' 
      );
    } else if (!loading && forgotUserMail === 'success')
      NotificationManager.success(
        'Please check your email.',
        'Forgot Password Success',
        3000,
        null,
        null,
        '' 
      );
  }, [error, forgotUserMail, loading]); */

  const initialValues = { email };

  return (
    <Layout cardTitle="user.forgot-password">
      <CardSubtitle>
        Please use your e-mail to reset your password. <br />
        If you are not a member, please{' '}
        <NavLink to="/register" style={{ color: 'green' }}>
          register
        </NavLink>
        .
      </CardSubtitle>
      <Formik initialValues={initialValues} onSubmit={onForgotPassword}>
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

            <div className="d-flex justify-content-center align-items-center">
              <AuthButton
                loading={loading}
                label="user.reset-password-button"
              />
            </div>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

const mapStateToProps = ({ auth }) => {
  const { forgotUserMail, loading, error } = auth;
  return { forgotUserMail, loading, error };
};

export default connect(mapStateToProps, {
  forgotPasswordAction: forgotPassword,
})(ForgotPassword);
