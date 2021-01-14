/* eslint-disable no-param-reassign */
import React, { createRef, useState } from 'react';
import { Card, CardBody, FormGroup, Label, Spinner } from 'reactstrap';
import { Wizard, Steps, Step } from 'react-albus';
import { injectIntl } from 'react-intl';
import { Formik, Form, Field } from 'formik';
import IntlMessages from '../../helpers/IntlMessages';
import BottomNavigation from '../../components/wizard/BottomNavigation';
import TopNavigation from '../../components/wizard/TopNavigation';

//TODO: replace validation with YUP
const validateFirstName = (value) => {
  let error;
  if (!value) {
    error = 'Please enter your First Name';
  }
  return error;
};

const validateLastName = (value) => {
  let error;
  if (!value) {
    error = 'Please enter your Last Name';
  } else if (value.length < 2) {
    error = 'Last Name must be longer than 2 characters';
  }
  return error;
};

const validateDateOfBirth = (value) => {
  let error;
  if (!value) {
    error = 'Please enter your Date of Birth';
  } else if (value.length < 4) {
    error = 'Date of Birth must be longer than 4 characters';
  }
  return error;
};

const Validation = ({ intl }) => {
  const forms = [createRef(null), createRef(null), createRef(null)];
  const [bottomNavHidden, setBottomNavHidden] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fields, setFields] = useState([
    {
      valid: false,
      name: 'firstName',
      value: '',
    },
    {
      valid: false,
      name: 'lastName',
      value: '',
    },
    {
      valid: false,
      name: 'dateOfBirth',
      value: '',
    },
  ]);

  const asyncLoading = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      console.log(fields);
    }, 3000);
  };

  const onClickNext = (goToNext, steps, step) => {
    if (steps.length - 1 <= steps.indexOf(step)) {
      return;
    }
    const formIndex = steps.indexOf(step);
    const form = forms[formIndex].current;
    const { name } = fields[formIndex];
    form.submitForm().then(() => {
      const newFields = [...fields];

      newFields[formIndex].value = form.values[name];
      newFields[formIndex].valid = !form.errors[name];
      setFields(newFields);

      if (!form.errors[name] && form.touched[name]) {
        goToNext();
        step.isDone = true;
        if (steps.length - 2 <= steps.indexOf(step)) {
          setBottomNavHidden(true);
          asyncLoading();
        }
      }
    });
  };

  const onClickPrev = (goToPrev, steps, step) => {
    if (steps.indexOf(step) <= 0) {
      return;
    }
    goToPrev();
  };

  const { messages } = intl;
  return (
    <Card>
      <CardBody className="wizard wizard-default">
        <Wizard>
          <TopNavigation className="justify-content-center" disableNav />
          <Steps>
            <Step
              id="step1"
              name={messages['wizard.step-name-1']}
              desc={messages['wizard.step-desc-1']}
            >
              <div className="wizard-basic-step">
                <Formik
                  innerRef={forms[0]}
                  initialValues={{
                    firstName: fields[0].value,
                  }}
                  onSubmit={() => {}}
                >
                  {({ errors, touched }) => (
                    <Form className="av-tooltip tooltip-label-right">
                      <FormGroup>
                        <Label>{messages['forms.firstName']}</Label>
                        <Field
                          className="form-control"
                          name="firstName"
                          validate={validateFirstName}
                        />
                        {errors.firstName && touched.firstName && (
                          <div className="invalid-feedback d-block">
                            {errors.firstName}
                          </div>
                        )}
                      </FormGroup>
                    </Form>
                  )}
                </Formik>
              </div>
            </Step>
            <Step
              id="step2"
              name={messages['wizard.step-name-2']}
              desc={messages['wizard.step-desc-2']}
            >
              <div className="wizard-basic-step">
                <Formik
                  innerRef={forms[1]}
                  initialValues={{
                    lastName: fields[1].value,
                  }}
                  onSubmit={() => {}}
                >
                  {({ errors, touched }) => (
                    <Form className="av-tooltip tooltip-label-right">
                      <FormGroup>
                        <Label>{messages['forms.lastName']}</Label>
                        <Field
                          className="form-control"
                          name="lastName"
                          validate={validateLastName}
                        />
                        {errors.lastName && touched.lastName && (
                          <div className="invalid-feedback d-block">
                            {errors.lastName}
                          </div>
                        )}
                      </FormGroup>
                    </Form>
                  )}
                </Formik>
              </div>
            </Step>

            <Step
              id="step3"
              name={messages['wizard.step-name-3']}
              desc={messages['wizard.step-desc-3']}
            >
              <div className="wizard-basic-step">
                <Formik
                  innerRef={forms[2]}
                  initialValues={{
                    dateOfBirth: fields[2].value,
                  }}
                  onSubmit={() => {}}
                >
                  {({ errors, touched }) => (
                    <Form className="av-tooltip tooltip-label-right error-l-75">
                      <FormGroup>
                        <Label>{messages['forms.dateOfBirth']}</Label>
                        <Field
                          className="form-control"
                          name="dateOfBirth"
                          type="dateOfBirth"
                          validate={validateDateOfBirth}
                        />
                        {errors.dateOfBirth && touched.dateOfBirth && (
                          <div className="invalid-feedback d-block">
                            {errors.dateOfBirth}
                          </div>
                        )}
                      </FormGroup>
                    </Form>
                  )}
                </Formik>
              </div>
            </Step>
            <Step id="step4" hideTopNav>
              <div className="wizard-basic-step text-center pt-3">
                {loading ? (
                  <div>
                    <Spinner color="primary" className="mb-1" />
                    <p>
                      <IntlMessages id="wizard.async" />
                    </p>
                  </div>
                ) : (
                  <div>
                    <h2 className="mb-2">
                      <IntlMessages id="wizard.content-thanks" />
                    </h2>
                    <p>
                      <IntlMessages id="wizard.registered" />
                    </p>
                  </div>
                )}
              </div>
            </Step>
          </Steps>
          <BottomNavigation
            onClickNext={onClickNext}
            onClickPrev={onClickPrev}
            className={`justify-content-center ${
              bottomNavHidden && 'invisible'
            }`}
            prevLabel={messages['wizard.prev']}
            nextLabel={messages['wizard.next']}
          />
        </Wizard>
      </CardBody>
    </Card>
  );
};
export default injectIntl(Validation);
