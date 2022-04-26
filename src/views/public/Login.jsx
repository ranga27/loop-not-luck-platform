/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react';
import { Form } from 'reactstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import {
  useAuthSignInWithEmailAndPassword,
  useAuthUser,
} from '@react-query-firebase/auth';
import { auth } from '../../helpers/Firebase';
import IntlMessages from '../../helpers/IntlMessages';
import Layout from '../../layout/Layout';
import AuthButton from '../../components/AuthButton';
import { signInSchema } from '../../constants/signInSchema';
import { TextInput } from '../../components/form/FormFields';

// TODO: check for email verified?
// TODO: merge Layout with AuthLayout
const Login = () => {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    defaultValues: { email: '', password: '' },
    resolver: yupResolver(signInSchema),
  });
  const mutation = useAuthSignInWithEmailAndPassword(auth, {
    onSuccess(userCred) {
      console.debug('User is signed in!');
      if (userCred.user) {
        navigate('/');
      }
    },
    onError(error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error,
      });
    },
  });

  // const userData = useUserData(uid);

  /*   if (currentUser) {
    if (currentUser.role === 'employer')
      dispatch(getCompany(currentUser.companyId));
    navigate('/');
  } */

  const onUserLogin = (data) => {
    if (!mutation.isLoading) {
      mutation.mutate(data);
    }
  };

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
          <AuthButton loading={mutation.isLoading} label="user.login-button" />
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
    </Layout>
  );
};

export default Login;
