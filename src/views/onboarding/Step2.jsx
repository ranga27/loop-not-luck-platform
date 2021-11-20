import React from 'react';
import { FormGroup, Label } from 'reactstrap';
import { Step } from 'react-albus';
import { motion } from 'framer-motion';
import { Formik, Form, Field } from 'formik';

export const validateEmail = (value) => {
  let error;
  if (!value) {
    error = 'Please enter your email address';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    error = 'Invalid email address';
  }
  return error;
};

export function Step2(form, fields, messages) {
  return (
    <Step id="step2">
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
              name: fields.email,
            }}
            validateOnMount
            onSubmit={() => {}}
          >
            {({ errors, touched }) => (
              <Form className="av-tooltip tooltip-label-right error-l-75">
                <FormGroup>
                  <Label>{messages['forms.email']}</Label>
                  <Field
                    className="form-control"
                    name="email"
                    validate={validateEmail}
                  />
                  {errors.email && touched.email && (
                    <div className="invalid-feedback d-block">
                      {errors.email}
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
