/* eslint-disable import/prefer-default-export */
import React from 'react';
import { FormGroup, Label } from 'reactstrap';
import * as Yup from 'yup';
import { Step } from 'react-albus';
import { motion } from 'framer-motion';
import { Formik, Form } from 'formik';
import { FormikCustomRadioGroup } from '../../components/form/FormikCustomRadioGroup';

// TODO: move to constants
const options = [
  {
    label: 'Black / African / Caribbean / Black British',
    value: 'Black / African / Caribbean / Black British',
  },
  { label: 'Arab', value: 'Arab' },
  { label: 'Asian / Asian British', value: 'Asian / Asian British' },
  { label: 'Bangladeshi', value: 'Bangladeshi' },
  { label: 'Caribbean', value: 'Caribbean' },
  { label: 'Chinese', value: 'Chinese' },
  {
    label: 'English / Welsh / Scottish / Northern Irish / British',
    value: 'English / Welsh / Scottish / Northern Irish / British',
  },
  { label: 'Indian', value: 'Indian' },
  { label: 'Irish', value: 'Irish' },
  {
    label: 'Mixed - White and Black Caribbean',
    value: 'Mixed - White and Black Caribbean',
  },
  {
    label: 'Mixed - White and Black African',
    value: 'Mixed - White and Black African',
  },
  { label: 'Mixed - White and Asian', value: 'Mixed - White and Asian' },
  {
    label: 'Mixed - Black and Other (please specify in other section)',
    value: 'Mixed - Black and Other (please specify in other section)',
  },
  { label: 'Pakistani', value: 'Pakistani' },
  { label: 'Other', value: 'Other' },
];

// TODO: pass schema from parent
const validationSchema = Yup.object().shape({
  ethnicity: Yup.string().required('Ethnicity is required'),
});
export function Step3(form, fields, messages) {
  return (
    <Step id="step3">
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
              ethnicity: fields.ethnicity,
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
                    options={options}
                  />
                  {errors.ethnicity && touched.ethnicity && (
                    <div className="invalid-feedback d-block">
                      {errors.ethnicity}
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
