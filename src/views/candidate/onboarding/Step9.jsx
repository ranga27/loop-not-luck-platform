/* eslint-disable import/prefer-default-export */
import React from 'react';
import { FormGroup, Label } from 'reactstrap';
import * as Yup from 'yup';
import { Step } from 'react-albus';
import { Formik, Form, Field } from 'formik';
import { FormikCustomCheckboxGroup } from '../../../components/form/FormikCustomCheckboxGroup';
import { StepLayout } from '../../../layout/stepLayout';
import { hearAboutOptions } from '../../../data/hearAbout';

// TODO: pass schema from parent
const validationSchema = Yup.object().shape({
  hearAbout: Yup.array()
    .required('Select at least one option')
    .min(1, 'Select at least one option'),
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
export const Step9 = (form, { hearAbout }, messages) => {
  return (
    <Step id="step9">
      <StepLayout>
        <Formik
          validationSchema={validationSchema}
          innerRef={form}
          initialValues={{
            hearAbout,
            hearAboutOther: '',
          }}
          validateOnMount
          onSubmit={() => {}}
        >
          {({ errors, touched, values, setFieldTouched, setFieldValue }) => (
            <Form className="av-tooltip tooltip-left-top error-l-75">
              <FormGroup className="d-flex flex-column align-items-center">
                <div>
                  <Label>{messages['forms.hearAbout']}</Label>
                </div>
                <FormikCustomCheckboxGroup
                  name="hearAbout"
                  id="hearAbout"
                  value={values.hearAbout}
                  onChange={setFieldValue}
                  onBlur={setFieldTouched}
                  options={hearAboutOptions}
                  inline="true"
                />
                {errors.hearAbout && touched.hearAbout && (
                  <div className="invalid-feedback d-block">
                    {errors.hearAbout}
                  </div>
                )}
              </FormGroup>
              <FormGroup>
                {values.hearAbout.includes('Other') && (
                  <div>
                    <Field
                      className="form-control"
                      name="hearAboutOther"
                      validate={validateOther}
                    />
                    {errors.hearAboutOther && touched.hearAboutOther && (
                      <div className="invalid-feedback d-block">
                        {errors.hearAboutOther}
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
