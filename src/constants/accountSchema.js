import * as yup from 'yup';

const phoneRegExp = '^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-s./0-9]*$';

// eslint-disable-next-line import/prefer-default-export
export const AccountSchema = yup.object().shape(
  {
    firstName: yup.string().required('First Name is required'),
    lastName: yup.string().required('Last Name is required'),
    mobileNumber: yup
      .string()
      .matches(phoneRegExp, 'Mobile number is not valid')
      .required('Mobile number is required'),
    visaRequired: yup.string().required('Visa Status is required'),
    cv: yup.mixed().when('cv', {
      is: (value) => value,
      then: yup
        .mixed()
        .test('type', 'Only PDF format is accepted', (value) => {
          return value && value.type === 'application/pdf';
        })
        .test('fileSize', 'File Size is too large, reduce to 1 MB', (value) => {
          return value.size <= 1000000;
        }),
    }),
  },
  // Add Cyclic deps here because when require itself
  ['cv', 'cv']
);
