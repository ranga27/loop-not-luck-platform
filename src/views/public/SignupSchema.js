/* eslint-disable import/prefer-default-export */
import * as yup from 'yup';

export const SignUpSchema = yup.object().shape({
  firstName: yup
    .string()
    .required('Please enter your First Name')
    .min(2, 'Name is too short - should be 2 chars minimum'),
  email: yup
    .string()
    .email('Invalid email address')
    .required('Please enter your email address'),
  password: yup
    .string()
    .required('Please enter your password')
    .min(8, 'Please use at least 8 characters'),
  role: yup.string().required('An option is required'),
  company: yup.string().when('role', {
    is: (value) => value === 'Employer',
    then: yup.string().required('Company is required'),
    otherwise: yup.string().notRequired(),
  }),
});
