/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import { FormGroup, Label } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
// TODO: Use RHF
import { Formik, Form, Field } from 'formik';
import Swal from 'sweetalert2';
import { registerUser, logoutUser } from '../../redux/actions';
import IntlMessages from '../../helpers/IntlMessages';
import Layout from './layout';
import { SignUpSchema } from './SignUpSchema';
import AuthButton from './AuthButton';

const Register = ({ history }) => {
  const { loading, error, currentUser } = useSelector(
    (state) => state.authUser
  );
  const dispatch = useDispatch();
  const [firstName] = useState('sarang');
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
    } else if (!loading && currentUser === 'success') {
      Swal.fire(
        'Awesome!',
        "You're successfully registered! Check your E-Mails (Spam folder included) for a confirmation E-Mail. Login once you confirmed your E-Mail.",
        'success'
      ).then((result) => {
        if (result.isConfirmed || result.isDismissed) {
          // Firebase signs in user, hence sign out immediately to verify email
          dispatch(logoutUser(history));
          history.push('/');
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser, loading]);

  const onUserRegister = (values) => {
    if (!loading) {
      if (values.email !== '' && values.password !== '') {
        dispatch(registerUser(values, history));
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
            <div className="d-flex justify-content-end align-items-center">
              <FormGroup className="form-group mb-4">
                <Label className="d-block">Select One</Label>
                <FormikRadioButtonGroup
                  inline
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
            </div>
          </Form>
        )}
      </Formik>
      <p className="mb-0">
        If you are a member, please{' '}
        <NavLink to="/user/login" style={{ color: 'green' }}>
          login
        </NavLink>
        .
      </p>
    </Layout>
  );
};

const FormikRadioButtonGroup = ({
  name,
  value,
  options,
  inline = false,
  onChange,
  onBlur,
}) => {
  const handleChange = (val) => {
    onChange(name, val);
  };

  const handleBlur = () => {
    onBlur(name, true);
  };

  return (
    <>
      {options.map((child, index) => {
        return (
          <div
            // eslint-disable-next-line react/no-array-index-key
            key={`${name}_${child.value}_${index}`}
            className={`position-relative form-check ${
              inline ? 'form-check-inline' : ''
            }`}
          >
            <input
              id={child.value}
              name={name}
              type="radio"
              className="form-check-input"
              onChange={() => handleChange(child.value)}
              onBlur={handleBlur}
              defaultChecked={value === child.value}
              disabled={child.disabled}
            />
            <label className="form-check-label">{child.label}</label>
          </div>
        );
      })}
    </>
  );
};

export default Register;
