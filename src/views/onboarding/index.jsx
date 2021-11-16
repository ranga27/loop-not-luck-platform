import React, { Suspense } from 'react';
import { Card, CardBody, Row } from 'reactstrap';
import { Wizard, Steps, Step } from 'react-albus';
import { injectIntl } from 'react-intl';
import { motion } from 'framer-motion';
import BottomNavigation from '../../components/wizard/BottomNavigation';
import TopNavigation from '../../components/wizard/TopNavigation';
import { Colxx } from '../../components/common/CustomBootstrap';
import IntlMessages from '../../helpers/IntlMessages';
import UserLayout from '../../layout/UserLayout';

const Onboarding = ({ intl }) => {
  const topNavClick = (stepItem, push) => {
    push(stepItem.id);
  };

  const onClickNext = (goToNext, steps, step) => {
    // eslint-disable-next-line no-param-reassign
    step.isDone = true;
    if (steps.length - 1 <= steps.indexOf(step)) {
      return;
    }
    goToNext();
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
                    className="justify-content-between"
                    disableNav={false}
                    topNavClick={topNavClick}
                  />
                  <Steps>
                    <Step
                      id="step1"
                      name={messages['wizard.step-name-1']}
                      desc={messages['wizard.step-desc-1']}
                    >
                      <motion.div
                        className="col-md-6 offset-md-3"
                        initial={{ x: '-100vw' }}
                        animate={{ x: 0 }}
                        transition={{ stiffness: 150 }}
                      >
                        <div className="wizard-basic-step text-center">
                          <p>
                            <IntlMessages id="wizard.content-1" />
                          </p>
                        </div>
                      </motion.div>
                    </Step>
                    <Step
                      id="step2"
                      name={messages['wizard.step-name-2']}
                      desc={messages['wizard.step-desc-2']}
                    >
                      <motion.div
                        className="col-md-6 offset-md-3"
                        animate={{ opacity: 1, y: 0 }}
                        initial={{ opacity: 0, y: 20 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.15 }}
                      >
                        <div className="wizard-basic-step text-center">
                          <p>
                            <IntlMessages id="wizard.content-2" />
                          </p>
                        </div>
                      </motion.div>
                    </Step>
                    <Step
                      id="step3"
                      name={messages['wizard.step-name-3']}
                      desc={messages['wizard.step-desc-3']}
                      hideTopNav
                    >
                      <motion.div animate={{ scale: 1.5 }}>
                        <div className="wizard-basic-step text-center">
                          <p className="mb-2">
                            <IntlMessages id="wizard.content-thanks" />
                          </p>
                          <p>
                            <IntlMessages id="wizard.content-3" />
                          </p>
                        </div>
                      </motion.div>
                    </Step>
                  </Steps>
                  <BottomNavigation
                    onClickNext={onClickNext}
                    onClickPrev={onClickPrev}
                    className="justify-content-between"
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
