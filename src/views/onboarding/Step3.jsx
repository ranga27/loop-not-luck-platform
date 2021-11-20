import React from 'react';
import { FormGroup, Label } from 'reactstrap';
import { Step } from 'react-albus';
import { motion } from 'framer-motion';
import { Formik, Form, Field } from 'formik';

export const validatePassword = (value) => {
  let error;
  if (!value) {
    error = 'Please enter your password';
  } else if (value.length < 6) {
    error = 'Password must be longer than 6 characters';
  }
  return error;
};
export function Step3(form, fields, messages) {
  return (
    <Step id="step3">
      <motion.div
        className="col-md-6 offset-md-3"
        animate={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 20 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.15 }}
      >
        <div className="wizard-basic-step">
          <Formik
            innerRef={form}
            initialValues={{
              password: fields.password,
            }}
            onSubmit={() => {}}
            validateOnMount
          >
            {({ errors, touched }) => (
              <Form className="av-tooltip tooltip-label-right error-l-75">
                <FormGroup>
                  <Label>{messages['forms.password']}</Label>
                  <Field
                    className="form-control"
                    name="password"
                    type="password"
                    validate={validatePassword}
                  />
                  {errors.password && touched.password && (
                    <div className="invalid-feedback d-block">
                      {errors.password}
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
