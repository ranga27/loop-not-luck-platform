/* eslint-disable no-param-reassign */
import React, { Suspense, createRef, useState } from 'react';
import { Card, CardBody, Row } from 'reactstrap';
import { Wizard, Steps } from 'react-albus';
import { injectIntl } from 'react-intl';
import { BottomNavigation, Colxx, TopNavigation } from '../../../components';
import UserLayout from '../../../layout/PublicLayout';
import { Step1 } from './Step1';
import { Step2 } from './Step2';
import { Step3 } from './Step3';
import { Step4 } from './Step4';
import { Step5 } from './Step5';
import { Step6 } from './Step6';
import { Step7 } from './Step7';
import { Step8 } from './Step8';
// TODO: Re-implement using Carousel or SweetAlert Queue with a back Button
const Onboarding = ({ intl }) => {
  // Array of form refs. To use RHF explore ref options
  const forms = new Array(7).fill(createRef(null));
  const [bottomNavHidden, setBottomNavHidden] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fields, setFields] = useState({
    interests: '',
    diversity: '',
    disability: '',
    roles: '',
    rolesInterestedIn: '',
  });

  const onClickNext = (goToNext, steps, step) => {
    if (steps.length - 1 <= steps.indexOf(step)) {
      return;
    }
    const formIndex = steps.indexOf(step);
    const form = forms[formIndex].current;

    form.submitForm().then(() => {
      if (!form.isDirty && form.isValid) {
        const newFields = { ...fields, ...form.values };
        setFields(newFields);

        if (steps.length - 2 <= steps.indexOf(step)) {
          // Onboarding done
          setBottomNavHidden(true);
          setLoading(true);
          console.log(newFields);
          setTimeout(() => {
            setLoading(false);
          }, 1000);
        }
        goToNext();
        step.isDone = true;
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
    <UserLayout>
      <Suspense fallback={<div className="loading" />}>
        <Row className="h-100">
          <Colxx xxs="12" xl="6" className="mx-auto my-auto">
            <Card>
              <CardBody className="wizard wizard-default">
                <Wizard>
                  <TopNavigation
                    className="justify-content-center"
                    disableNav
                  />
                  <Steps>
                    {Step1(forms[0], fields, messages)}
                    {Step2(forms[1], fields, messages)}
                    {Step3(forms[2], fields, messages)}
                    {Step4(forms[3], fields, messages)}
                    {Step5(forms[4], fields, messages)}
                    {Step6(forms[5], fields, messages)}
                    {Step7(forms[6], fields, messages)}
                    {Step8(loading, fields)}
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
          </Colxx>
        </Row>
      </Suspense>
    </UserLayout>
  );
};
export default injectIntl(Onboarding);
