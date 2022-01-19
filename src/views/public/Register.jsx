/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import { FormGroup, Label } from 'reactstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
// TODO: Use RHF
import { Formik, Form, Field } from 'formik';
import Swal from 'sweetalert2';
import { setAuthError } from '../../redux/actions';
import IntlMessages from '../../helpers/IntlMessages';
import Layout from './layout';
import { SignUpSchema } from './SignupSchema';
import AuthButton from './AuthButton';
import { FormikCustomRadioGroup } from '../../components/form/FormikCustomRadioGroup';
import { logoutUser, registerUser } from '../../redux/auth/authSlice';

const Register = () => {
  const navigate = useNavigate();
  const { loading, error, currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [firstName] = useState('sarang');
  // TODO: for testing purposes, remove in production
  const [email] = useState('sarang@loopnotluck.com');
  const [password] = useState('hanumant');

  const [role] = useState('candidate');

  useEffect(() => {
    if (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error,
      });
      dispatch(setAuthError(''));
    } else if (!loading && currentUser === 'success') {
      Swal.fire(
        'Awesome!',
        'You are nearly in the loop. Please click the link the email just sent to verify your account.',
        'success'
      ).then((result) => {
        if (result.isConfirmed || result.isDismissed) {
          // Firebase signs in user on registration, hence sign out immediately to verify email
          dispatch(setAuthError(''));
          dispatch(logoutUser());
          navigate('/');
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser, loading]);

  const onUserRegister = (values) => {
    if (!loading) {
      if (values.email !== '' && values.password !== '') {
        dispatch(registerUser(values));
      }
    }
  };
  const options = [
    { value: 'candidate', label: 'Candidate' },
    { value: 'employer', label: 'Employer' },
  ];

  const initialValues = { firstName, email, password, role };

  return (
    <Layout cardTitle="user.register">
      <Formik
        initialValues={initialValues}
        validationSchema={SignUpSchema}
        onSubmit={onUserRegister}
      >
        {({ setFieldTouched, values, errors, touched, setFieldValue }) => (
          <Form className="av-tooltip tooltip-label-bottom">
            <FormGroup className="form-group has-float-label  mb-4">
              <Label>
                <IntlMessages id="user.first-name" />
              </Label>
              <Field className="form-control" name="firstName" />
              {errors.firstName && touched.firstName && (
                <div className="invalid-feedback d-block">
                  {errors.firstName}
                </div>
              )}
            </FormGroup>
            <FormGroup className="form-group has-float-label  mb-4">
              <Label>
                <IntlMessages id="user.email" />
              </Label>
              <Field className="form-control" name="email" />
              {errors.email && touched.email && (
                <div className="invalid-feedback d-block">{errors.email}</div>
              )}
            </FormGroup>
            <FormGroup className="form-group has-float-label  mb-4">
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
              <FormGroup className="form-group">
                <Label className="d-block">Select One</Label>
                <FormikCustomRadioGroup
                  inline="true"
                  name="role"
                  id="role"
                  value={values.role}
                  onChange={setFieldValue}
                  onBlur={setFieldTouched}
                  options={options}
                />
                {errors.role && touched.role ? (
                  <div className="invalid-feedback d-block">{errors.role}</div>
                ) : null}
              </FormGroup>
              <AuthButton loading={loading} label="user.register-button" />
              <p className="my-4">
                If you are a member, please{' '}
                <NavLink to="/login" style={{ color: 'green' }}>
                  login
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

export default Register;
