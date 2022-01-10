/* eslint-disable import/prefer-default-export */
import React from 'react';
import { FormGroup, Label } from 'reactstrap';
import * as Yup from 'yup';
import { Step } from 'react-albus';
import { Formik, Form } from 'formik';
import { diversityOptions } from '../../../data/diversityOptions';
import { FormikCustomCheckboxGroup } from '../../../components/form/FormikCustomCheckboxGroup';
import { StepLayout } from '../../../layout/stepLayout';

// TODO: pass schema from parent
const validationSchema = Yup.object().shape({
  diversity: Yup.array()
    .required('Select at least one option')
    .min(1, 'Select at least one option'),
});
export const Step2 = (form, { diversity }, messages) => {
  return (
    <Step id="step2">
      <StepLayout>
        <Formik
          validationSchema={validationSchema}
          innerRef={form}
          initialValues={{
            diversity,
          }}
          validateOnMount
          onSubmit={() => {}}
        >
          {({ errors, touched, values, setFieldTouched, setFieldValue }) => (
            <Form className="av-tooltip tooltip-label-right error-l-75">
              <FormGroup>
                <Label>{messages['forms.diversity']}</Label>
                <FormikCustomCheckboxGroup
                  name="diversity"
                  id="diversity"
                  value={values.diversity}
                  onChange={setFieldValue}
                  onBlur={setFieldTouched}
                  options={diversityOptions}
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
      </StepLayout>
    </Step>
  );
};
