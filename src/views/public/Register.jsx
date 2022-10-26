/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { yupResolver } from '@hookform/resolvers/yup';
import { Form, Button } from 'reactstrap';
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
import { TextInput, CheckBox } from '../../components/form/FormFields';
import { auth, firestore } from '../../helpers/Firebase';
import { getUserError } from '../../helpers/getUserError';
import TermsModal from './TermsModal';

const Register = () => {
  const defaultValues = {
    firstName: '',
    email: '',
    password: '',
    confirmPassword: '',
    company: '',
    termsSelected: false,
  };
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    defaultValues,
    resolver: yupResolver(signUpSchema),
  });
  const alert = withReactContent(Swal);
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
    const { email, password, firstName, termsSelected } = values;
    if (!createUser.isLoading && termsSelected === true) {
      createUser.mutate(
        { email, password },
        {
          onSuccess(data) {
            const { uid } = data.user;
            createTempUser.mutate({
              uid,
              email,
              firstName,
              role: 'candidate',
              confirmationHash,
              createdAt: serverTimestamp(),
            });
            alert
              .fire({
                title: 'Awesome!',
                text: 'You are nearly in the loop. Please check your email to verify your account (check your spam/junk/promotions folder).',
                icon: 'success',
                confirmButtonColor: '#3085d6',
                iconColor: '#3085d6',
              })
              .then((result) => {
                if (result.isConfirmed || result.isDismissed) {
                  // Firebase signs in user on registration, hence sign out immediately to verify email
                  signOut.mutate();
                }
              });
          },
        }
      );
    } else {
      alert.fire({
        title: 'Agree with T&Cs',
        text: 'Please agree with our terms and conditions before continuing',
        icon: 'error',
        imageHeight: 80,
        imageWidth: 80,
      });
    }
  };

  const [modalOpen, setModalOpen] = useState(false);
  const handleOpenModal = async () => {
    setModalOpen(true);
  };

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  // TODO: move form to its own component, see login
  return (
    <>
      <Layout cardTitle="user.register">
        <Form onSubmit={handleSubmit(onUserSubmit)}>
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
          <TextInput
            name="confirmPassword"
            label="Confirm Password"
            errors={errors.confirmPassword}
            control={control}
            type="password"
          />
          <div className="truncate d-flex flex-row">
            <CheckBox
              name="termsSelected"
              label="I agree with the"
              control={control}
            />
            <Button
              type="button"
              className="btn-link-secondary"
              onClick={() => handleOpenModal()}
            >
              terms and conditions
            </Button>
          </div>
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
      {modalOpen && (
        <TermsModal
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          toggle={toggleModal}
        />
      )}
    </>
  );
};

export default Register;
