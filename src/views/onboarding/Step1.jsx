/* eslint-disable import/prefer-default-export */
import React from 'react';
import { FormGroup, Label } from 'reactstrap';
import * as Yup from 'yup';
import { Step } from 'react-albus';
import { motion } from 'framer-motion';
import { Formik, Form } from 'formik';
import { FormikCustomRadioGroup } from '../../components/FormikCustomRadioGroup';

// TODO: move to constants
const options = [
  { label: 'Male', value: 'Male' },
  { label: 'Female', value: 'Female' },
  { label: 'Male Transgender', value: 'Male Transgender' },
  { label: 'Female Transgender', value: 'Female Transgender' },
  { label: 'Non-binary', value: 'Non-binary' },
  { label: 'I prefer not to say', value: 'I prefer not to say' },
  { label: 'Other', value: 'Other' },
];

// TODO: pass schema from parent
const validationSchema = Yup.object().shape({
  gender: Yup.string().required('Gender is required'),
});
export function Step1(form, fields, messages) {
  return (
    <Step id="step1">
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
              gender: fields.gender,
            }}
            validateOnMount
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
                    options={options}
                  />
                  {errors.gender && touched.gender && (
                    <div className="invalid-feedback d-block">
                      {errors.gender}
                    </div>
                  )}
                </FormGroup>
              </Form>
            )}
          </Formik>
        </div>
      </motion.div>
    </Step>
  );
}
