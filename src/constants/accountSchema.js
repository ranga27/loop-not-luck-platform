import * as yup from 'yup';

const phoneRegExp = /^[0-9,+,(), ,]{1,}(,[0-9]+){0,}$/;

// eslint-disable-next-line import/prefer-default-export
export const AccountSchema = yup.object().shape(
  {
    firstName: yup.string().required('First Name is required'),
    lastName: yup.string().required('Last Name is required'),
    mobileNumber: yup
      .string()
      .matches(phoneRegExp, 'Mobile number is not valid')
      .required('Mobile number is required')
      .min(4, 'Phone Number is too short - should be 4 chars minimum'),
    visaRequired: yup.string().required('Visa Status is required'),
    location: yup.string().required('Location is required'),
    technicalSkills: yup.mixed().required('Technical Skills is required'),
    technicalSkillsOther: yup.string().when('technicalSkills', {
      is: (value) => value === 'Other',
      then: yup.string().required('Please enter other skills'),
    }),
    jobValues: yup.mixed().required('Job Values is required'),
    jobValuesOther: yup.string().when('jobValues', {
      is: (value) => value === 'Other',
      then: yup.string().required('Please enter other job values'),
    }),
    behaviorAttributes: yup
      .mixed()
      .required('Behaviour/Attributes/Strengths is required'),
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
