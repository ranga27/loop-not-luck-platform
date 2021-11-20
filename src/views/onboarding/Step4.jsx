/* eslint-disable import/prefer-default-export */
import React from 'react';
import { Spinner } from 'reactstrap';
import { Step } from 'react-albus';
import { motion } from 'framer-motion';
import IntlMessages from '../../helpers/IntlMessages';

export function Step4(loading) {
  return (
    <Step id="step4" hideTopNav>
      <motion.div animate={{ scale: 1.5 }}>
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
      </motion.div>
    </Step>
  );
}
