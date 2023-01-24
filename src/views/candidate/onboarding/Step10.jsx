/* eslint-disable import/prefer-default-export */
import React from 'react';
import { Button, Spinner } from 'reactstrap';
import { Step } from 'react-albus';
import { useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import IntlMessages from '../../../helpers/IntlMessages';
import { StepLayout } from '../../../layout/stepLayout';
import { updateUserOnBoardedInFirebase } from '../../../helpers/firestoreService';

export const Step10 = (loading, fields) => {
  const navigate = useNavigate();
  const user = useQuery(['userAuth']);
  const { uid } = user.data;
  const handleClick = () => {
    updateUserOnBoardedInFirebase({
      uid,
      ...fields,
      isOnboarded: true,
    });
    navigate('/app/account');
  };
  return (
    <Step id="step10" hideTopNav>
      <StepLayout>
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
                <Button
                  color="primary"
                  type="submit"
                  size="lg"
                  onClick={handleClick}
                >
                  <IntlMessages id="wizard.end-button" />
                </Button>
              </p>
            </div>
          )}
        </div>
      </StepLayout>
    </Step>
  );
};
