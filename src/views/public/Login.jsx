import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  useAuthSignInWithEmailAndPassword,
  useAuthSignOut,
} from '@react-query-firebase/auth';
import { auth } from '../../helpers/Firebase';
import LoginForm from './LoginForm';
import showUserError from '../../helpers/showUserError';

// TODO: merge Layout with AuthLayout
const Login = () => {
  const navigate = useNavigate();
  const signOut = useAuthSignOut(auth);

  const mutation = useAuthSignInWithEmailAndPassword(auth, {
    onSuccess(userCred) {
      console.debug('User is signed in!');
      if (userCred.user) {
        // Check if email verified
        if (userCred.user.emailVerified) {
          navigate('/');
        } else {
          signOut.mutate();
          throw new Error('email-not-verified');
        }
      }
    },
    onError(error) {
      showUserError(error);
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
