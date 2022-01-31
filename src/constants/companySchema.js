import * as yup from 'yup';

// eslint-disable-next-line import/prefer-default-export
export const companySchema = yup.object().shape({
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
  industry: yup.array().required().min(1, 'Select at least one'),
});

/* */
