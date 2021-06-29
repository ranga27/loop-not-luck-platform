import * as yup from 'yup';

// eslint-disable-next-line import/prefer-default-export
export const companySchema = yup.object().shape({
  name: yup.string().required('Please enter the Name'),

  email: yup
    .string()
    .email('Invalid email')
    .required('Please enter an email address'),

  logoFile: yup
    .mixed()
    .required('You need to provide a file')
    .test(
      'type',
      'Only the following formats are accepted: .jpeg, .jpg, and .png',
      (value) => {
        return (
          value && (value.type === 'image/jpeg' || value.type === 'image/png')
        );
      }
    ),

  tags: yup.array().required('Select atleast one tag'),
});
