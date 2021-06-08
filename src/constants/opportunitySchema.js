import * as Yup from 'yup';

// eslint-disable-next-line import/prefer-default-export
export const OpportunitySchema = Yup.object().shape({
  title: Yup.string()
    .max(100, 'Title Too Long!')
    .required('Please enter the Title'),

  organisation: Yup.string()
    .max(100, 'Too Long!')
    .required('Please enter the Organisation'),

  location: Yup.string().required('Please select the Location'),

  positionType: Yup.string().required('Please select Position Type'),

  description: Yup.string().required('Please provide the details'),
  /*
  deadline: Yup.date().nullable().required('Date required'),
  startDate: Yup.date().nullable().required('Start Date required'),
  email: Yup.string()
    .email('Invalid email')
    .required('Please enter your email address'), */
});
