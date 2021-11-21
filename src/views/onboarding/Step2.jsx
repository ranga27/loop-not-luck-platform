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
  {
    label: 'Neither of my parents have attended university',
    value: 'Neither of my parents have attended university',
  },
  {
    label: 'One of my parents has attended university',
    value: 'One of my parents has attended university',
  },
  {
    label: 'I was on free school meals at school',
    value: 'I was on free school meals at school',
  },
  {
    label: 'Publically funded education',
    value: 'Publically funded education',
  },
  { label: 'Privately funded education', value: 'Privately funded education' },
  {
    label: 'Identify with the LGBTQIA+ community',
    value: 'Identify with the LGBTQIA+ community',
  },
];

// TODO: pass schema from parent
const validationSchema = Yup.object().shape({
  diversity: Yup.string().required('Select at least one option'),
});
export function Step2(form, fields, messages) {
  return (
    <Step id="step2">
      <motion.div
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
              diversity: fields.diversity,
            }}
            validateOnMount
            onSubmit={() => {}}
          >
            {({ errors, touched, values, setFieldTouched, setFieldValue }) => (
              <Form className="av-tooltip tooltip-label-right error-l-75">
                <FormGroup>
                  <Label>{messages['forms.diversity']}</Label>
                  <FormikCustomRadioGroup
                    name="diversity"
                    id="diversity"
                    value={values.diversity}
                    onChange={setFieldValue}
                    onBlur={setFieldTouched}
                    options={options}
                  />
                  {errors.diversity && touched.diversity && (
                    <div className="invalid-feedback d-block">
                      {errors.diversity}
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
