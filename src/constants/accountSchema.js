import * as Yup from 'yup';

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

// eslint-disable-next-line import/prefer-default-export
export const AccountSchema = Yup.object().shape({
  firstName: Yup.string().required('First Name is required'),
  lastName: Yup.string().required('Last Name is required'),
  mobileNumber: Yup.string()
    .matches(phoneRegExp, 'Mobile number is not valid')
    .required('Mobile number is required'),
  visaRequired: Yup.string().required('Visa Status is required'),
  graduationYear: Yup.date().nullable().required('Graduation Date required'),
  degreeSubject: Yup.string().required('Degree subject is required'),
  /*
  organisation: Yup.string()
    .max(100, 'Too Long!')
    .required('Please enter the Organisation'),

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
