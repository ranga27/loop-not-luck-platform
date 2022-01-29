import * as Yup from 'yup';

// eslint-disable-next-line import/prefer-default-export
export const OpportunitySchema = Yup.object().shape({
  title: Yup.string()
    .max(100, 'Title Too Long!')
    .required('Please enter the Title'),

  /*
  location: Yup.string().required('Please select the Location'),

  positionType: Yup.string().required('Please select Position Type'),

  description: Yup.string().required('Please provide the details'),
  
  email: Yup.string()
    .email('Invalid email')
    .required('Please enter your email address'),

  website: Yup.string().required('Please enter your website'),
  
  deadline: Yup.date().nullable().required('Date required'),
  startDate: Yup.date().nullable().required('Start Date required'),
   */
});
