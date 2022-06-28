/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { yupResolver } from '@hookform/resolvers/yup';
import { Form } from 'reactstrap';
import {
  useAuthCreateUserWithEmailAndPassword,
  useAuthSignOut,
} from '@react-query-firebase/auth';
import { useFirestoreCollectionMutation } from '@react-query-firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import { collection, serverTimestamp } from 'firebase/firestore';
import Layout from '../../layout/Layout';
import { signUpSchema } from '../../constants/signupSchema';
import AuthButton from '../../components/AuthButton';
import { SelectField, TextInput } from '../../components/form/FormFields';
import { auth, firestore } from '../../helpers/Firebase';
import { getUserError } from '../../helpers/getUserError';

const Register = () => {
  const defaultValues = {
    firstName: '',
    email: '',
    password: '',
    role: '',
    company: '',
  };
  const {
    watch,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    defaultValues,
    resolver: yupResolver(signUpSchema),
  });
  const role = watch('role');
  const alert = withReactContent(Swal);
  const navigate = useNavigate();
  const confirmationHash = uuidv4();
  const signOut = useAuthSignOut(auth);

  const createUser = useAuthCreateUserWithEmailAndPassword(auth, {
    onError(error) {
      alert.fire({
        icon: 'error',
        title: 'Oops...',
        text: getUserError(error.message),
      });
    },
  });
  const createTempUser = useFirestoreCollectionMutation(
    collection(firestore, 'temporaryUsers')
  );
  const onUserSubmit = async (values) => {
    const { email, password, firstName } = values;
    if (!createUser.isLoading) {
      createUser.mutate(
        { email, password },
        {
          onSuccess(data) {
            const { uid } = data.user;
            console.log(uid, 'created');
            createTempUser.mutate({
              uid,
              email,
              firstName,
              confirmationHash,
              createdAt: serverTimestamp(),
            });
            alert
              .fire({
                title: 'Awesome!',
                text: 'You are nearly in the loop. Please click the link the email just sent to verify your account.',
                icon: 'success',
                confirmButtonColor: '#3085d6',
                iconColor: '#3085d6',
              })
              .then((result) => {
                if (result.isConfirmed || result.isDismissed) {
                  // Firebase signs in user on registration, hence sign out immediately to verify email
                  signOut.mutate();
                  navigate('/');
                }
              });
          },
        }
      );
    }
  };
  const options = [
    { value: 'candidate', label: 'Candidate' },
    { value: 'employer', label: 'Employer' },
  ];

  return (
    <Layout cardTitle="user.register">
      <Form onSubmit={handleSubmit(onUserSubmit)}>
        <SelectField
          label="Select one"
          name="role"
          control={control}
          options={options}
          isSearchable={false}
          errors={errors.role}
        />
        {role === 'employer' && (
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
          <AuthButton
            loading={createUser.isLoading}
            label="user.register-button"
          />
          <p className="my-4">
            If you are a member, please{' '}
            <NavLink to="/login" style={{ color: '#F7B919' }}>
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
