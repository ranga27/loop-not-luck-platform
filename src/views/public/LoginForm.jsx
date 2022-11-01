/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { Form } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import IntlMessages from '../../helpers/IntlMessages';
import Layout from '../../layout/Layout';
import AuthButton from '../../components/AuthButton';
import { signInSchema } from '../../constants/signInSchema';
import { TextInput } from '../../components/form/FormFields';
// TODO: check for email verified?
// TODO: merge Layout with AuthLayout
const LoginForm = ({ onUserLogin, isLoading }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    defaultValues: { email: '', password: '' },
    resolver: yupResolver(signInSchema),
  });

  return (
    <Layout cardTitle="user.login-title">
      <Form onSubmit={handleSubmit(onUserLogin)}>
        <TextInput
          name="email"
          label="Email"
          errors={errors.email}
          control={control}
        />
        <TextInput
          name="password"
          label="Password"
          errors={errors.password}
          control={control}
          type="password"
        />
        <div className="d-flex flex-column justify-content-center align-items-center">
          <NavLink to="/forgot-password">
            <IntlMessages id="user.forgot-password-question" />
          </NavLink>
          <AuthButton loading={isLoading} label="user.login-button" />
          <p>
            <br />
            If you are not a member, please{' '}
            <NavLink to="/register" style={{ color: '#F7B919' }}>
              register
            </NavLink>
            .
          </p>
        </div>
      </Form>
    </Layout>
  );
};

export default LoginForm;
