/* eslint-disable import/prefer-default-export */
import React from 'react';
import { FormGroup, Label } from 'reactstrap';
import * as Yup from 'yup';
import { Step } from 'react-albus';
import { Formik, Form, Field } from 'formik';
import { FormikCustomCheckboxGroup } from '../../../components/form/FormikCustomCheckboxGroup';
import { StepLayout } from '../../../layout/stepLayout';
import { interestOptions } from '../../../data/interestOptions';

const validationSchema = Yup.object().shape({
  interests: Yup.array().required('Please select at least one').min(1),
});

const validateOtherInterests = (value) => {
  let error;
  if (!value) {
    error = 'Please enter a value for Notice Period';
  } else if (value.length < 2) {
    error = 'Value must be longer than 2 characters';
  }
  return error;
};

export const Step7 = (form, { interests }, messages) => {
  return (
    <Step id="step7">
      <StepLayout>
        <Formik
          validationSchema={validationSchema}
          innerRef={form}
          initialValues={{
            interests,
            otherInterests: '',
          }}
          validateOnMount
          onSubmit={() => {}}
        >
          {({ errors, touched, values, setFieldTouched, setFieldValue }) => (
            <Form className="av-tooltip tooltip-left-top error-r-275">
              <FormGroup>
                <Label>{messages['forms.interests']}</Label>
                <FormikCustomCheckboxGroup
                  inline="true"
                  name="interests"
                  id="interests"
                  value={values.interests}
                  onChange={setFieldValue}
                  onBlur={setFieldTouched}
                  options={interestOptions}
                />
                {errors.interests && touched.interests ? (
                  <div className="invalid-feedback d-block">
                    {errors.interests}
                  </div>
                ) : null}
              </FormGroup>
              <FormGroup>
                {values.interests.includes('Others') && (
                  <div>
                    <Field
                      className="form-control"
                      name="otherInterests"
                      validate={validateOtherInterests}
                      placeholder="Please enter your areas of interests"
                    />
                    {errors.otherInterests && touched.otherInterests && (
                      <div className="invalid-feedback d-block">
                        {errors.otherInterests}
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
