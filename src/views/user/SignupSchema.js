/* eslint-disable import/prefer-default-export */
import * as Yup from 'yup';

export const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
    .required('Please enter your First Name')
    .min(2, 'Name is too short - should be 2 chars minimum'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Please enter your email address'),
  password: Yup.string()
    .required('Please enter your password')
    .min(8, 'Password is too short - should be 8 chars minimum.'),
  role: Yup.string().required('An option is required'),
});
