/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { Label, FormGroup } from 'reactstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
// TODO: change to RHF smartform
import { Formik, Form, Field } from 'formik';
import Swal from 'sweetalert2';
import { setAuthError } from '../../redux/actions';
import IntlMessages from '../../helpers/IntlMessages';
import Layout from './layout';
import AuthButton from './AuthButton';
import { SignInSchema } from './SignInSchema';
import { adminRoot } from '../../constants/defaultValues';
import { loginUser } from '../../redux/auth/authSlice';

// TODO: check for email verified?
// TODO: merge Layout with AuthLayout
const Login = () => {
  const navigate = useNavigate();
  const { loading, error, currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [email] = useState('sarang@loopnotluck.com');
  const [password] = useState('hanumant');

  useEffect(() => {
    if (error)
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error,
      }).then((result) => {
        if (result.isConfirmed || result.isDismissed) {
          dispatch(setAuthError(''));
        }
      });
    if (currentUser) {
      navigate('/');
    }
  }, [error, currentUser]);

  const onUserLogin = (values) => {
    if (!loading) {
      if (values.email !== '' && values.password !== '') {
        dispatch(loginUser(values));
      }
    }
  };
  const initialValues = { email, password };

  return (
    <Layout cardTitle="user.login-title">
      <Formik
        initialValues={initialValues}
        validationSchema={SignInSchema}
        onSubmit={onUserLogin}
      >
        {({ errors, touched }) => (
          <Form className="av-tooltip tooltip-label-bottom">
            <FormGroup className="form-group has-float-label">
              <Label>
                <IntlMessages id="user.email" />
              </Label>
              <Field className="form-control" name="email" />
              {errors.email && touched.email && (
                <div className="invalid-feedback d-block">{errors.email}</div>
              )}
            </FormGroup>
            <FormGroup className="form-group has-float-label">
              <Label>
                <IntlMessages id="user.password" />
              </Label>
              <Field className="form-control" type="password" name="password" />
              {errors.password && touched.password && (
                <div className="invalid-feedback d-block">
                  {errors.password}
                </div>
              )}
            </FormGroup>
            <div className="d-flex flex-column justify-content-center align-items-center">
              <NavLink to="/forgot-password">
                <IntlMessages id="user.forgot-password-question" />
              </NavLink>
              <AuthButton loading={loading} label="user.login-button" />
              <p>
                <br />
                If you are not a member, please{' '}
                <NavLink to="/register" style={{ color: 'green' }}>
                  register
                </NavLink>
                .
              </p>
            </div>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default Login;
