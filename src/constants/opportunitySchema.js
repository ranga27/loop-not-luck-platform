import * as Yup from 'yup';

// eslint-disable-next-line import/prefer-default-export
export const OpportunitySchema = Yup.object().shape({
  title: Yup.string()
    .max(100, 'Title Too Long!')
    .required('Please enter the Title'),
  company: Yup.string().required('Please select the company'),
  location: Yup.string().required('Please select the Location'),
  positionType: Yup.string().required('Please select Position Type'),
  description: Yup.string().required('Please provide the details'),
  howToApply: Yup.string().required('An option is required'),
  email: Yup.string().when('howToApply', {
    is: (value) => value === 'email',
    then: Yup.string()
      .email('Invalid email')
      .required('Please enter an email address'),
  }),
  website: Yup.string().when('howToApply', {
    is: (value) => value === 'website',
    then: Yup.string().required('Please enter your website'),
  }),
  deadline: Yup.date().when('rolling', {
    is: (value) => value === false,
    then: Yup.date().nullable().required('Deadline required'),
    otherwise: Yup.date().nullable().notRequired(),
  }),
  startDate: Yup.date().nullable().required('Start Date required'),
});
