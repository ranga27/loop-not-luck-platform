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
  cv: Yup.mixed()
    .test('type', 'Only PDF format is accepted', (value) => {
      return value && value.type === 'application/pdf';
    })
    .test('fileSize', 'File Size is too large, reduce to 1 MB', (value) => {
      return value.size <= 1000000;
    }),
});
