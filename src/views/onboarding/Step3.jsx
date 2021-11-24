/* eslint-disable import/prefer-default-export */
import React from 'react';
import { FormGroup, Label } from 'reactstrap';
import * as Yup from 'yup';
import { Step } from 'react-albus';
import { motion } from 'framer-motion';
import { Formik, Form } from 'formik';
import { FormikCustomRadioGroup } from '../../components/form/FormikCustomRadioGroup';
import { ethnicityOptions } from './ethnicityOptions';

// TODO: pass schema from parent
const validationSchema = Yup.object().shape({
  ethnicity: Yup.string().required('Ethnicity is required'),
});
export function Step3(form, fields, messages) {
  return (
    <Step id="step3">
      <motion.div
        className="col-md-auto offset-md-auto"
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
                    options={ethnicityOptions}
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
