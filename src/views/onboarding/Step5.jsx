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
  { label: 'Full-time roles', value: 'Full-time roles' },
  { label: 'Part-time roles', value: 'Part-time roles' },
  { label: 'Internships', value: 'Internships' },
  { label: 'Scholarships', value: 'Scholarships' },
  { label: 'Graduate Schemes', value: 'Graduate Schemes' },
  { label: 'Graduate Jobs', value: 'Graduate Jobs' },
  { label: 'Company Events', value: 'Company Events' },
  { label: 'Insight Days', value: 'Insight Days' },
  { label: 'Summer Placements', value: 'Summer Placements' },
  { label: 'Work Experience', value: 'Work Experience' },
  { label: 'Industrial Placements', value: 'Industrial Placements' },
];

// TODO: pass schema from parent
const validationSchema = Yup.object().shape({
  roles: Yup.string().required('Please select'),
});
export function Step5(form, fields, messages) {
  return (
    <Step id="step5">
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
              roles: fields.roles,
            }}
            validateOnMount
            onSubmit={() => {}}
          >
            {({ errors, touched, values, setFieldTouched, setFieldValue }) => (
              <Form className="av-tooltip tooltip-label-right error-l-75">
                <FormGroup>
                  <Label>{messages['forms.roles']}</Label>
                  <FormikCustomRadioGroup
                    name="roles"
                    id="roles"
                    value={values.roles}
                    onChange={setFieldValue}
                    onBlur={setFieldTouched}
                    options={options}
                  />
                  {errors.roles && touched.roles && (
                    <div className="invalid-feedback d-block">
                      {errors.roles}
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
