import * as yup from 'yup';

// eslint-disable-next-line import/prefer-default-export
export const companySchema = yup.object().shape({
  name: yup
    .string()
    .max(100, 'Company Name Too Long!')
    .required('Please enter the Company Name'),
  email: yup
    .string()
    .email('Invalid email')
    .required('Please enter an email address'),

  logoFile: yup.mixed().when('logoUrl', {
    is: (value) => value,
    then: yup.mixed().notRequired(),
    otherwise: yup
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
  }),
  industry: yup.mixed().required('Industry is required'),
  genderIdentity: yup.mixed().required('Please select at least one'),
  jobValues: yup.mixed().required('Job Values is required'),
});

/* */
