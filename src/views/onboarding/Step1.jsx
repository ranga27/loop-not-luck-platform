/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */
import React, { useState } from 'react';
import { FormGroup, Label } from 'reactstrap';
import * as Yup from 'yup';
import { Step } from 'react-albus';
import { motion } from 'framer-motion';
import { Formik, Form, Field } from 'formik';
import { FormikCustomRadioGroup } from '../../components/form/FormikCustomRadioGroup';
import { genderOptions } from './genderOptions';
import { StepLayout } from './stepLayout';

const validationSchema = Yup.object().shape({
  gender: Yup.string().required('Gender is required'),
});

const validateOther = (value) => {
  console.log(value);
  let error;
  if (!value) {
    error = 'Please enter a value for Other';
  } else if (value.length < 2) {
    error = 'Value must be longer than 2 characters';
  }
  return error;
};

export function Step1(form, fields, messages) {
  return (
    <Step id="step1">
      <StepLayout>
        <Formik
          innerRef={form}
          initialValues={{
            gender: fields.gender,
          }}
          validateOnMount
          validationSchema={validationSchema}
          onSubmit={() => {}}
        >
          {({ errors, touched, values, setFieldTouched, setFieldValue }) => (
            <Form className="av-tooltip tooltip-label-right error-l-75">
              <FormGroup>
                <Label>{messages['forms.gender']}</Label>
                <FormikCustomRadioGroup
                  name="gender"
                  id="gender"
                  value={values.gender}
                  onChange={setFieldValue}
                  onBlur={setFieldTouched}
                  options={genderOptions}
                />
                {errors.gender && touched.gender && (
                  <div className="invalid-feedback d-block">
                    {errors.gender}
                  </div>
                )}
              </FormGroup>
              <FormGroup>
                {values.gender === 'Other' && (
                  <div>
                    <Field
                      className="form-control"
                      name="other"
                      validate={validateOther}
                    />
                    {errors.other && touched.other && (
                      <div className="invalid-feedback d-block">
                        {errors.other}
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
