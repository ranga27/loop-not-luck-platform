/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */
import React from 'react';
import { FormGroup, Label } from 'reactstrap';
import * as Yup from 'yup';
import { Step } from 'react-albus';
import { Formik, Form, Field } from 'formik';
import 'react-datepicker/dist/react-datepicker.css';
import { StepLayout } from '../../../layout/stepLayout';
import { FormikDatePicker } from '../../../components/form/FormikDatePicker';
import { FormikCustomRadioGroup } from '../../../components/form/FormikCustomRadioGroup';
import { startOptions } from '../../../data/startOptions';

// TODO: pass schema from parent
const validationSchema = Yup.object().shape({
  start: Yup.string().required('Please select an option'),
  specificStartDate: Yup.date().nullable().required('Specific Date required'),
});

const validateNoticePeriod = (value) => {
  let error;
  if (!value) {
    error = 'Please enter a value for Notice Period';
  } else if (value.length < 2) {
    error = 'Value must be longer than 2 characters';
  }
  return error;
};

export const Step6 = (form, { start }, messages) => {
  return (
    <Step id="step6">
      <StepLayout>
        <Formik
          validationSchema={validationSchema}
          innerRef={form}
          initialValues={{
            start,
            specificStartDate: null,
            noticePeriod: '',
          }}
          validateOnMount
          onSubmit={() => {}}
        >
          {({ errors, touched, values, setFieldTouched, setFieldValue }) => (
            <Form className="av-tooltip tooltip-left-top error-r-275">
              <FormGroup>
                <Label>{messages['forms.start']}</Label>
                <FormikCustomRadioGroup
                  inline="true"
                  name="start"
                  id="start"
                  value={values.start}
                  onChange={setFieldValue}
                  onBlur={setFieldTouched}
                  options={startOptions}
                />
                {errors.start && touched.start ? (
                  <div className="invalid-feedback d-block">{errors.start}</div>
                ) : null}
              </FormGroup>
              <FormGroup>
                {values.start === 'Notice Period' && (
                  <div>
                    <Field
                      className="form-control"
                      name="noticePeriod"
                      validate={validateNoticePeriod}
                      placeholder="Please enter notice period"
                    />
                    {errors.noticePeriod && touched.noticePeriod && (
                      <div className="invalid-feedback d-block">
                        {errors.noticePeriod}
                      </div>
                    )}
                  </div>
                )}
              </FormGroup>
              <FormGroup>
                {values.start === 'Specific Date' && (
                  <>
                    <Label>{messages['forms.startLabel']}</Label>
                    <FormikDatePicker
                      name="specificStartDate"
                      value={values.specificStartDate}
                      onChange={setFieldValue}
                      errors={errors.specificStartDate}
                      onBlur={setFieldTouched}
                    />
                    {errors.specificStartDate && touched.specificStartDate ? (
                      <div className="invalid-feedback d-block">
                        {errors.specificStartDate}
                      </div>
                    ) : null}
                  </>
                )}
              </FormGroup>
            </Form>
          )}
        </Formik>
      </StepLayout>
    </Step>
  );
};
