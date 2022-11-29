/* eslint-disable import/prefer-default-export */
import React, { useState } from 'react';
import { FormGroup, Label, Tooltip } from 'reactstrap';
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
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const toggle = () => setTooltipOpen(!tooltipOpen);

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
            <Form className="av-tooltip tooltip-left-top error-l-75">
              <FormGroup className="d-flex flex-column align-items-center">
                <div>
                  <Label>{messages['forms.diversity']}</Label>
                  <i
                    className="iconsminds-information h6 px-2 text-primary"
                    style={{ width: '20px', fontWeight: 'bold' }}
                    id="TooltipExample"
                  />
                </div>
                <FormikCustomCheckboxGroup
                  name="diversity"
                  id="diversity"
                  value={values.diversity}
                  onChange={setFieldValue}
                  onBlur={setFieldTouched}
                  options={diversityOptions}
                  inline="true"
                />
                <div>
                  <Tooltip
                    placement="bottom"
                    isOpen={tooltipOpen}
                    target="TooltipExample"
                    toggle={toggle}
                    autohide={false}
                  >
                    A state school is a school that is funded and controlled by
                    the state and for which no fees are charged
                  </Tooltip>
                </div>
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
