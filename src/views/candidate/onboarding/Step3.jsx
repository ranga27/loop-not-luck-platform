/* eslint-disable import/prefer-default-export */
import React from 'react';
import { FormGroup, Label } from 'reactstrap';
import * as Yup from 'yup';
import { Step } from 'react-albus';
import { Formik, Form, Field } from 'formik';
import { FormikCustomRadioGroup } from '../../../components/form/FormikCustomRadioGroup';
import { ethnicityOptions } from '../../../data/ethnicityOptions';
import { StepLayout } from '../../../layout/stepLayout';

const validationSchema = Yup.object().shape({
  ethnicity: Yup.string().required('Ethnicity is required'),
});

const validateOther = (value) => {
  let error;
  if (!value) {
    error = 'Please enter a value for Other';
  } else if (value.length < 2) {
    error = 'Value must be longer than 2 characters';
  }
  return error;
};

export const Step3 = (form, { ethnicity }, messages) => {
  return (
    <Step id="step3">
      <StepLayout>
        <Formik
          validationSchema={validationSchema}
          innerRef={form}
          initialValues={{
            ethnicity,
            ethnicityOther: '',
          }}
          validateOnMount
          onSubmit={() => {}}
        >
          {({ errors, touched, values, setFieldTouched, setFieldValue }) => (
            <Form className="av-tooltip tooltip-label-right error-l-75">
              <FormGroup>
                <Label>{messages['forms.ethnicity']}</Label>
                <FormikCustomRadioGroup
                  name="ethnicity"
                  id="ethnicity"
                  value={values.ethnicity}
                  onChange={setFieldValue}
                  onBlur={setFieldTouched}
                  options={ethnicityOptions}
                />
                {errors.ethnicity && touched.ethnicity && (
                  <div className="invalid-feedback d-block">
                    {errors.ethnicity}
                  </div>
                )}
              </FormGroup>
              <FormGroup>
                {values.ethnicity === 'Other' && (
                  <div>
                    <Field
                      className="form-control"
                      name="ethnicityOther"
                      validate={validateOther}
                    />
                    {errors.ethnicityOther && touched.ethnicityOther && (
                      <div className="invalid-feedback d-block">
                        {errors.ethnicityOther}
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
};
