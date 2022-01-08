/* eslint-disable import/prefer-default-export */
import React from 'react';
import { FormGroup, Label } from 'reactstrap';
import * as Yup from 'yup';
import { Step } from 'react-albus';
import { Formik, Form } from 'formik';
import { FormikCustomCheckboxGroup } from '../../../components/form/FormikCustomCheckboxGroup';
import { StepLayout } from '../../../layout/stepLayout';
import { interestOptions } from '../../../data/interestOptions';

const validationSchema = Yup.object().shape({
  interests: Yup.array().required('Please select at least one').min(1),
});
export function Step7(form, fields, messages) {
  return (
    <Step id="step7">
      <StepLayout>
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
                  options={interestOptions}
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
      </StepLayout>
    </Step>
  );
}
