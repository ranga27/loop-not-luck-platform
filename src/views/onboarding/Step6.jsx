/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */
import React from 'react';
import { FormGroup, Label } from 'reactstrap';
import * as Yup from 'yup';
import { Step } from 'react-albus';
import { Formik, Form } from 'formik';
import 'react-datepicker/dist/react-datepicker.css';
import { StepLayout } from './stepLayout';
import { FormikDatePicker } from '../../components/form/FormikDatePicker';

// TODO: pass schema from parent
const validationSchema = Yup.object().shape({
  start: Yup.string().required('Start Date is required'),
});
export function Step6(form, fields, messages) {
  return (
    <Step id="step6">
      <StepLayout>
        <Formik
          validationSchema={validationSchema}
          innerRef={form}
          initialValues={{
            start: fields.start,
          }}
          validateOnMount
          onSubmit={() => {}}
        >
          {({ errors, touched, values, setFieldTouched, setFieldValue }) => (
            <Form className="av-tooltip tooltip-label-right error-l-75">
              <FormGroup>
                <Label>{messages['forms.start']}</Label>
                <FormikDatePicker
                  name="start"
                  value={values.start}
                  onChange={setFieldValue}
                  onBlur={setFieldTouched}
                />
                {errors.start && touched.start ? (
                  <div className="invalid-feedback d-block">{errors.start}</div>
                ) : null}
              </FormGroup>
            </Form>
          )}
        </Formik>
      </StepLayout>
    </Step>
  );
}
