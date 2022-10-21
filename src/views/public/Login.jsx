import React from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useAuthSignInWithEmailAndPassword } from '@react-query-firebase/auth';
import { auth } from '../../helpers/Firebase';
import { getUserError } from '../../helpers/getUserError';
import LoginForm from './LoginForm';

// TODO: check for email verified?
// TODO: merge Layout with AuthLayout
const Login = () => {
  const navigate = useNavigate();

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
        text: getUserError(error),
      });
    },
  });

  const onUserLogin = (data) => {
    if (!mutation.isLoading) {
      mutation.mutate(data);
    }
  };

  return (
    <LoginForm
      isLoading={mutation.isLoading}
      onUserLogin={(data) => onUserLogin(data)}
    />
  );
};

export default Login;
