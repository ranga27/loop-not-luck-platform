/* eslint-disable import/prefer-default-export */
import React from 'react';
import { FormGroup, Label } from 'reactstrap';
import * as Yup from 'yup';
import { Step } from 'react-albus';
import { Formik, Form } from 'formik';
import { roleOptions } from './roleOptions';
import { StepLayout } from './stepLayout';
import { FormikCustomCheckboxGroup } from '../../components/form/FormikCustomCheckboxGroup';

const validationSchema = Yup.object().shape({
  rolesInterestedIn: Yup.array()
    .required('Select at least one option')
    .min(1, 'Select at least one option'),
});
export function Step5(form, fields, messages) {
  return (
    <Step id="step5">
      <StepLayout>
        <Formik
          validationSchema={validationSchema}
          innerRef={form}
          initialValues={{
            rolesInterestedIn: fields.rolesInterestedIn,
          }}
          validateOnMount
          onSubmit={() => {}}
        >
          {({ errors, touched, values, setFieldTouched, setFieldValue }) => (
            <Form className="av-tooltip tooltip-label-right error-l-75">
              <FormGroup>
                <Label>{messages['forms.roles']}</Label>
                <FormikCustomCheckboxGroup
                  name="rolesInterestedIn"
                  id="rolesInterestedIn"
                  value={values.rolesInterestedIn}
                  onChange={setFieldValue}
                  onBlur={setFieldTouched}
                  options={roleOptions}
                />
                {errors.rolesInterestedIn && touched.rolesInterestedIn && (
                  <div className="invalid-feedback d-block">
                    {errors.rolesInterestedIn}
                  </div>
                )}
              </FormGroup>
            </Form>
          )}
        </Formik>
      </StepLayout>
    </Step>
  );
}
