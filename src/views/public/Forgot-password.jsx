/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Label, FormGroup, CardSubtitle } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { sendPasswordResetEmail } from 'firebase/auth';
import IntlMessages from '../../helpers/IntlMessages';
import AuthButton from '../../components/AuthButton';
import Layout from '../../layout/Layout';
import { auth } from '../../helpers/Firebase';

const validateEmail = (value) => {
  let error;
  if (!value) {
    error = 'Please enter your email address';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    error = 'Invalid email address';
  }
  return error;
};

const ForgotPassword = () => {
  const [email] = useState('');
  const alert = withReactContent(Swal);

  const onForgotPassword = (values) => {
    sendPasswordResetEmail(auth, values.email, {
      url: 'https://loop-luck.web.app/login',
    });
    alert.fire(
      'Awesome!',
      'You are nearly done resetting your password. Please click the link the email just sent to reset your password.',
      'success'
    );
    console.log('Password reset email sent');
  };
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
              <AuthButton label="pages.submit" />
            </div>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default ForgotPassword;
