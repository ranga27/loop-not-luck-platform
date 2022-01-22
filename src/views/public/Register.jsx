/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { yupResolver } from '@hookform/resolvers/yup';
import { Form } from 'reactstrap';
import Layout from './layout';
import { SignUpSchema } from './SignupSchema';
import AuthButton from './AuthButton';
import {
  logoutUser,
  registerUser,
  setAuthError,
} from '../../redux/auth/authSlice';
import { SelectField, TextInput } from '../../components/form/FormFields';

const Register = () => {
  // TODO: for testing purposes, remove in production
  const defaultValues = {
    firstName: 'sarang',
    email: 'sarang@loopnotluck.com',
    password: 'hanumant',
    role: '',
    company: '',
  };
  const {
    watch,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues, resolver: yupResolver(SignUpSchema) });
  const regAlert = withReactContent(Swal);
  const navigate = useNavigate();
  const { loading, error, currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const role = watch('role');
  useEffect(() => {
    if (error) {
      regAlert.fire({
        icon: 'error',
        title: 'Oops...',
        text: error,
      });
      dispatch(setAuthError(''));
    } else if (!loading && currentUser === 'success') {
      regAlert
        .fire(
          'Awesome!',
          'You are nearly in the loop. Please click the link the email just sent to verify your account.',
          'success'
        )
        .then((result) => {
          if (result.isConfirmed || result.isDismissed) {
            // Firebase signs in user on registration, hence sign out immediately to verify email
            dispatch(setAuthError(''));
            dispatch(logoutUser());
            navigate('/');
          }
        });
    }
  }, [currentUser, loading]);

  const onUserSubmit = (values) => {
    console.log(values);
    if (!loading) {
      if (values.email !== '' && values.password !== '') {
        dispatch(registerUser(values));
      }
    }
  };
  const options = [
    { value: 'Candidate', label: 'Candidate' },
    { value: 'Employer', label: 'Employer' },
  ];

  return (
    <Layout cardTitle="user.register">
      <Form
        onSubmit={handleSubmit(onUserSubmit)}
        className="av-tooltip tooltip-label-bottom"
      >
        <SelectField
          label="Select one"
          name="role"
          control={control}
          options={options}
          isSearchable={false}
          errors={errors.role}
        />
        {role === 'Employer' && (
          <TextInput
            name="company"
            label="Company"
            control={control}
            errors={errors.company}
          />
        )}
        <TextInput
          name="firstName"
          label="First Name"
          errors={errors.firstName}
          control={control}
        />
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
    </Layout>
  );
};

export default Register;
