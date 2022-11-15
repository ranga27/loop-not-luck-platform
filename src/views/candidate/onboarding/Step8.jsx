/* eslint-disable import/prefer-default-export */
import React from 'react';
import { FormGroup, Label } from 'reactstrap';
import * as Yup from 'yup';
import { Step } from 'react-albus';
import { Formik, Form } from 'formik';
import { FormikCustomRadioGroup } from '../../../components/form/FormikCustomRadioGroup';
import { StepLayout } from '../../../layout/stepLayout';
import getOptions from '../../../data/rolesOfInterests';

const validationSchema = Yup.object().shape({
  rolesOfInterest: Yup.string().required('Please select an option'),
});

export const Step8 = (form, { rolesOfInterest, interests }, messages) => {
  const selectAreaOfInterest = getOptions(interests);
  return (
    <Step id="step8">
      <StepLayout>
        <Formik
          validationSchema={validationSchema}
          innerRef={form}
          initialValues={{
            rolesOfInterest,
          }}
          validateOnMount
          onSubmit={() => {}}
        >
          {({ errors, touched, values, setFieldTouched, setFieldValue }) => (
            <Form className="av-tooltip tooltip-left-top error-r-275">
              <FormGroup>
                <Label>{messages['forms.rolesOfInterest']}</Label>
                <FormikCustomRadioGroup
                  inline="true"
                  name="rolesOfInterest"
                  id="rolesOfInterest"
                  value={values.rolesOfInterest}
                  onChange={setFieldValue}
                  onBlur={setFieldTouched}
                  options={selectAreaOfInterest}
                />
                {errors.rolesOfInterest && touched.rolesOfInterest ? (
                  <div className="invalid-feedback d-block">
                    {errors.rolesOfInterest}
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
