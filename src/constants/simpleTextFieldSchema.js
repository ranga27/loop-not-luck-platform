import * as yup from 'yup';

const simpleTextFieldSchema = yup.object().shape({
  textField: yup.string().required('Please Fill The Answer'),
});

export default simpleTextFieldSchema;
