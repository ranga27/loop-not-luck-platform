/* eslint-disable import/prefer-default-export */
import React from 'react';
import { Button, Spinner } from 'reactstrap';
import { Step } from 'react-albus';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import IntlMessages from '../../../helpers/IntlMessages';
import { StepLayout } from '../../../layout/stepLayout';
import { updateUser } from '../../../redux/auth/authSlice';

export const Step8 = ({ loading, fields }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { uid } = useSelector((state) => state.auth.currentUser);
  const handleClick = () => {
    dispatch(updateUser({ uid, ...fields, isOnboarded: true }));
    navigate('/app/roles');
  };
  return (
    <Step id="step8" hideTopNav>
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
