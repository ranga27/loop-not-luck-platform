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
  areaOfInterests: Yup.array()
    .required('Select at least one option')
    .min(1, 'Select at least one option'),
});

export const Step7 = (form, { areaOfInterests }, messages) => {
  return (
    <Step id="step7">
      <StepLayout>
        <Formik
          validationSchema={validationSchema}
          innerRef={form}
          initialValues={{
            areaOfInterests,
          }}
          validateOnMount
          onSubmit={() => {}}
        >
          {({ errors, touched, values, setFieldTouched, setFieldValue }) => (
            <Form className="av-tooltip tooltip-left-top error-r-275">
              <FormGroup>
                <Label>{messages['forms.interests']}</Label>
                <FormikCustomCheckboxGroup
                  inline="true"
                  name="areaOfInterests"
                  id="areaOfInterests"
                  value={values.areaOfInterests}
                  onChange={setFieldValue}
                  onBlur={setFieldTouched}
                  options={interestOptions}
                />
                {errors.areaOfInterests && touched.areaOfInterests ? (
                  <div className="invalid-feedback d-block">
                    {errors.areaOfInterests}
                  </div>
                ) : null}
              </FormGroup>
            </Form>
          )}
        </Formik>
      </StepLayout>
    </Step>
  );
};
