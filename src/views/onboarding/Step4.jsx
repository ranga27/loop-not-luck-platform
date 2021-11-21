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
  { label: 'Yes', value: 'Yes' },
  { label: 'No', value: 'No' },
  { label: 'Please Specify', value: 'Please Specify' },
];

// TODO: pass schema from parent
const validationSchema = Yup.object().shape({
  disability: Yup.string().required('Please select'),
});
export function Step4(form, fields, messages) {
  return (
    <Step id="step4">
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
              disability: fields.disability,
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
              </Form>
            )}
          </Formik>
        </div>
      </motion.div>
    </Step>
  );
}
