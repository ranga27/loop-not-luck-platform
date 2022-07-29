/* eslint-disable import/prefer-default-export */
import React, { useState } from 'react';
import { FormGroup, Label, Tooltip } from 'reactstrap';
import * as Yup from 'yup';
import { Step } from 'react-albus';
import { Formik, Form, Field } from 'formik';
import { FormikCustomRadioGroup } from '../../../components/form/FormikCustomRadioGroup';
import { StepLayout } from '../../../layout/stepLayout';

// TODO: move to constants
const options = [
  { label: 'Yes', value: 'Yes' },
  { label: 'No', value: 'No' },
];

const validationSchema = Yup.object().shape({
  disability: Yup.string().required('Please select'),
});

const validateAnswer = (value) => {
  let error;
  if (!value) {
    error = 'Please specify the disability';
  } else if (value.length < 2) {
    error = 'Value must be longer than 2 characters';
  }
  return error;
};

export const Step4 = (form, { disability }, messages) => {
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const toggle = () => setTooltipOpen(!tooltipOpen);

  return (
    <Step id="step4">
      <StepLayout>
        <Formik
          validationSchema={validationSchema}
          innerRef={form}
          initialValues={{
            disability,
            disabilityAnswer: '',
          }}
          validateOnMount
          onSubmit={() => {}}
        >
          {({ errors, touched, values, setFieldTouched, setFieldValue }) => (
            <Form className="av-tooltip tooltip-left-top error-r-275">
              <FormGroup>
                <Label>{messages['forms.disability']}</Label>
                <i
                  className="iconsminds-information h6 px-2 text-primary"
                  style={{ width: '20px', fontWeight: 'bold' }}
                  id="TooltipExample"
                />
                <FormikCustomRadioGroup
                  inline="true"
                  name="disability"
                  id="disability"
                  value={values.disability}
                  onChange={setFieldValue}
                  onBlur={setFieldTouched}
                  options={options}
                />
                <div>
                  <Tooltip
                    placement="bottom"
                    isOpen={tooltipOpen}
                    target="TooltipExample"
                    toggle={toggle}
                    autohide={false}
                  >
                    Disability definition as per the Equality Act 2010-
                    <a
                      href="https://www.gov.uk/definition-of-disability-under-equality-act-2010"
                      target="_blank"
                      rel="noreferrer"
                      className="text-primary"
                    >
                      https://www.gov.uk/definition-of-disability-under-equality-act-2010
                    </a>
                  </Tooltip>
                </div>

                {errors.disability && touched.disability && (
                  <div className="invalid-feedback d-block">
                    {errors.disability}
                  </div>
                )}
              </FormGroup>

              <FormGroup>
                {values.disability === 'Yes' && (
                  <div>
                    <Field
                      className="form-control"
                      name="disabilityAnswer"
                      validate={validateAnswer}
                      placeholder="Please Specify"
                    />
                    {errors.disabilityAnswer && touched.disabilityAnswer && (
                      <div className="invalid-feedback d-block">
                        {errors.disabilityAnswer}
                      </div>
                    )}
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
