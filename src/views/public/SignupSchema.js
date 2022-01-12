/* eslint-disable import/prefer-default-export */
import * as Yup from 'yup';

export const SignUpSchema = Yup.object().shape({
  firstName: Yup.string()
    .required('Please enter your First Name')
    .min(2, 'Name is too short - should be 2 chars minimum'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Please enter your email address'),
  password: Yup.string()
    .required('Please enter your password')
    .min(8, 'Please use at least 8 characters'),
  role: Yup.string().required('An option is required'),
});
