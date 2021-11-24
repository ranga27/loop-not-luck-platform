/* eslint-disable import/prefer-default-export */
import React from 'react';
import { FormGroup, Label } from 'reactstrap';
import * as Yup from 'yup';
import { Step } from 'react-albus';
import { Formik, Form } from 'formik';
import { FormikCustomRadioGroup } from '../../components/form/FormikCustomRadioGroup';
import { roleOptions } from './roleOptions';
import { StepLayout } from './stepLayout';

const validationSchema = Yup.object().shape({
  roles: Yup.string().required('Please select'),
});
export function Step5(form, fields, messages) {
  return (
    <Step id="step5">
      <StepLayout>
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
                  options={roleOptions}
                />
                {errors.roles && touched.roles && (
                  <div className="invalid-feedback d-block">{errors.roles}</div>
                )}
              </FormGroup>
            </Form>
          )}
        </Formik>
      </StepLayout>
    </Step>
  );
}
