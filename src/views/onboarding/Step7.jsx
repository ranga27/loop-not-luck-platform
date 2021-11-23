/* eslint-disable import/prefer-default-export */
import React from 'react';
import { FormGroup, Label } from 'reactstrap';
import * as Yup from 'yup';
import { Step } from 'react-albus';
import { motion } from 'framer-motion';
import { Formik, Form } from 'formik';
import { FormikCustomCheckboxGroup } from '../../components/form/FormikCustomCheckboxGroup';

// TODO: move to constants
const options = [
  { label: 'Consulting', value: 'Consulting' },
  { label: 'Marketing', value: 'Marketing' },
  {
    label: 'Project and Programme Management',
    value: 'Project and Programme Management',
  },
  {
    label: 'Media, journalism, PR and publishing',
    value: 'Media, journalism, PR and publishing',
  },
  { label: 'Engineering', value: 'Engineering' },
  { label: 'Financial Services', value: 'Financial Services' },
  { label: 'Travel', value: 'Travel' },
  { label: 'Beauty, Cosmetics, Fashion', value: 'Beauty, Cosmetics, Fashion' },
  { label: 'Education', value: 'Education' },
  { label: 'Technology', value: 'Technology' },
  { label: 'Law', value: 'Law' },
  {
    label: 'National and Local Government/Public Sector',
    value: 'National and Local Government/Public Sector',
  },
  { label: 'Charity and Third Sector', value: 'Charity and Third Sector' },
  { label: 'Sustainability', value: 'Sustainability' },
];

// TODO: pass schema from parent
const validationSchema = Yup.object().shape({
  interests: Yup.array().required('Please select at least one').min(1),
});
export function Step7(form, fields, messages) {
  return (
    <Step id="step7">
      <motion.div
        className="col-md-6 offset-md-3"
        animate={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 20 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
      >
        <div className="wizard-basic-step">
          <Formik
            validationSchema={validationSchema}
            innerRef={form}
            initialValues={{
              interests: fields.interests,
            }}
            validateOnMount
            onSubmit={() => {}}
          >
            {({ errors, touched, values, setFieldTouched, setFieldValue }) => (
              <Form className="av-tooltip tooltip-label-right error-l-75">
                <FormGroup>
                  <Label>{messages['forms.interests']}</Label>
                  <FormikCustomCheckboxGroup
                    name="interests"
                    id="interests"
                    value={values.interests}
                    onChange={setFieldValue}
                    onBlur={setFieldTouched}
                    options={options}
                  />
                  {errors.interests && touched.interests ? (
                    <div className="invalid-feedback d-block">
                      {errors.interests}
                    </div>
                  ) : null}
                </FormGroup>
              </Form>
            )}
          </Formik>
        </div>
      </motion.div>
    </Step>
  );
}
