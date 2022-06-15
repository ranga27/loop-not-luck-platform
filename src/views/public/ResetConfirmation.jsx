/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Label, FormGroup, CardSubtitle } from 'reactstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { confirmPasswordReset } from 'firebase/auth';
import IntlMessages from '../../helpers/IntlMessages';
import AuthButton from '../../components/AuthButton';
import Layout from '../../layout/Layout';
import { auth } from '../../helpers/Firebase';

function useQuery() {
  const location = useLocation();
  return new URLSearchParams(location.search);
}
const ResetConfirmation = () => {
  const [password] = useState('');
  const navigate = useNavigate();
  const initialValues = { password };
  const alert = withReactContent(Swal);
  const query = useQuery();

  const onResetPassword = (values) => {
    confirmPasswordReset(auth, query.get('oobCode'), values.password)
      .then(() => {
        alert.fire(
          'Awesome!',
          'Password has been changed. You can login now.',
          'success'
        );
        navigate('/login');
      })
      .catch((err) => {
        alert.fire('Oops...', err.message, 'error');
      });
  };
  return (
    <Layout cardTitle="user.reset-password">
      <CardSubtitle>
        Please reset your password by filling the form below.
        <br />
      </CardSubtitle>
      <Formik initialValues={initialValues} onSubmit={onResetPassword}>
        {({ errors, touched }) => (
          <Form className="av-tooltip tooltip-label-bottom">
            <FormGroup className="form-group has-float-label">
              <Label>
                <IntlMessages id="user.password" />
              </Label>
              <Field className="form-control" name="password" type="password" />
              {errors.password && touched.password && (
                <div className="invalid-feedback d-block">
                  {errors.password}
                </div>
              )}
            </FormGroup>

            <div className="d-flex justify-content-center align-items-center">
              <AuthButton label="user.reset-password-button" />
            </div>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default ResetConfirmation;
