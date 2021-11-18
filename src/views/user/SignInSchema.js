/* eslint-disable import/prefer-default-export */
import * as Yup from 'yup';

export const SignInSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Please enter your email address'),
  password: Yup.string()
    .required('Please enter your password')
    .min(8, 'Password is too short - should be 8 chars minimum.'),
});
