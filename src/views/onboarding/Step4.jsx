/* eslint-disable import/prefer-default-export */
import React from 'react';
import { FormGroup, Label } from 'reactstrap';
import * as Yup from 'yup';
import { Step } from 'react-albus';
import { Formik, Form, Field } from 'formik';
import { FormikCustomRadioGroup } from '../../components/form/FormikCustomRadioGroup';
import { StepLayout } from './stepLayout';

// TODO: move to constants
const options = [
  { label: 'Yes', value: 'Yes' },
  { label: 'No', value: 'No' },
];

// TODO: pass schema from parent
const validationSchema = Yup.object().shape({
  disability: Yup.string().required('Please select'),
});

const validateAnswer = (value) => {
  let error;
  if (!value) {
    error = 'Please specify the disability';
  } else if (value.length < 2) {
    error = 'Value must be longer than 2 characters';
  }
  return error;
};

export function Step4(form, fields, messages) {
  return (
    <Step id="step4">
      <StepLayout>
        <Formik
          validationSchema={validationSchema}
          innerRef={form}
          initialValues={{
            disability: fields.disability,
            answer: '',
          }}
          validateOnMount
          onSubmit={() => {}}
        >
          {({ errors, touched, values, setFieldTouched, setFieldValue }) => (
            <Form className="av-tooltip tooltip-label-right error-l-75">
              <FormGroup>
                <Label>{messages['forms.disability']}</Label>
                <FormikCustomRadioGroup
                  name="disability"
                  id="disability"
                  value={values.disability}
                  onChange={setFieldValue}
                  onBlur={setFieldTouched}
                  options={options}
                />
                {errors.disability && touched.disability && (
                  <div className="invalid-feedback d-block">
                    {errors.disability}
                  </div>
                )}
              </FormGroup>
              <FormGroup>
                {values.disability === 'Yes' && (
                  <div>
                    <Field
                      className="form-control"
                      name="answer"
                      validate={validateAnswer}
                      placeholder="Please Specify"
                    />
                    {errors.answer && touched.answer && (
                      <div className="invalid-feedback d-block">
                        {errors.answer}
                      </div>
                    )}
                  </div>
                )}
              </FormGroup>
            </Form>
          )}
        </Formik>
      </StepLayout>
    </Step>
  );
}
