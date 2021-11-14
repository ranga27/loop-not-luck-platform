/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
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
import { useSelector, useDispatch } from 'react-redux';
// TODO: Use RHF
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

import { registerUser } from '../../redux/actions';
import { NotificationManager } from '../../components/common/react-notifications';

import IntlMessages from '../../helpers/IntlMessages';
import { Colxx } from '../../components/common/CustomBootstrap';

const SignupSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Please enter your email address'),
  password: Yup.string()
    .required('Please enter your password')
    .min(8, 'Password is too short - should be 8 chars minimum.'),
  role: Yup.string().required('An option is required'),
});

const Register = ({ history }) => {
  const { loading, error, currentUser } = useSelector(
    (state) => state.authUser
  );
  const dispatch = useDispatch();
  const [email] = useState('');
  const [password] = useState('');
  const [role] = useState('');
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
      /* Showing modal so disabling Notification toast
            NotificationManager.success(
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
        dispatch(registerUser(values, history));
      }
    }
  };
  const options = [
    { value: 'candidate', label: 'Candidate' },
    { value: 'employer', label: 'Employer' },
  ];

  const initialValues = { email, password, role };

  return (
    <Row className="h-100">
      <Colxx xxs="12" md="10" className="mx-auto my-auto">
        <Card className="auth-card">
          <div className="position-relative image-side " />
          <div className="form-side">
            <CardTitle className="mb-4">
              <IntlMessages id="user.register" />
            </CardTitle>

            <Formik
              initialValues={initialValues}
              validationSchema={SignupSchema}
              onSubmit={onUserRegister}
            >
              {({
                setFieldTouched,
                values,
                errors,
                touched,
                setFieldValue,
              }) => (
                <Form className="av-tooltip tooltip-label-bottom">
                  <FormGroup className="form-group has-float-label  mb-4">
                    <Label>
                      <IntlMessages id="user.email" />
                    </Label>
                    <Field className="form-control" name="email" />
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
                    />
                    {errors.password && touched.password && (
                      <div className="invalid-feedback d-block">
                        {errors.password}
                      </div>
                    )}{' '}
                  </FormGroup>
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
                      <div className="invalid-feedback d-block">
                        {errors.role}
                      </div>
                    ) : null}
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
            <p className="mb-0">
              If you are a member, please{' '}
              <NavLink to="/user/login" style={{ color: 'green' }}>
                login
              </NavLink>
              .
            </p>
          </div>
        </Card>
      </Colxx>
    </Row>
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
