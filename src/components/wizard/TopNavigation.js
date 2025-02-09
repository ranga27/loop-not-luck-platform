/* eslint-disable no-param-reassign */
import React from 'react';
import { WithWizard } from 'react-albus';
import { NavLink } from 'react-router-dom';

const TopNavigation = ({ className, disableNav, topNavClick }) => {
  const getClassName = (steps, step, index, stepItem) => {
    if (steps.indexOf(step) === index) {
      return 'step-doing';
    }
    if (steps.indexOf(step) > index || stepItem.isDone) {
      stepItem.isDone = true;
      return 'step-done';
    }
    return 'step';
  };

  const itemClick = (stepItem, push) => {
    if (disableNav) {
      return;
    }
    topNavClick(stepItem, push);
  };

  return (
    <WithWizard
      render={({ step, steps, push }) => (
        <ul
          className={`nav nav-tabs ${className}${
            disableNav ? ' disabled' : ''
          }`}
        >
          {steps.map((stepItem, index) => {
            if (!stepItem.hideTopNav) {
              return (
                <li
                  key={`topNavStep_${stepItem.id}`}
                  className={`nav-item ${getClassName(
                    steps,
                    step,
                    index,
                    stepItem
                  )}`}
                >
                  <NavLink
                    to="#"
                    location={{}}
                    className="nav-link"
                    onClick={() => itemClick(stepItem, push)}
                  >
                    <span>{stepItem.name}</span>
                    <small>{stepItem.desc}</small>
                  </NavLink>
                </li>
              );
            }
            return <span key={`topNavStep_${stepItem.id}`} />;
          })}
        </ul>
      )}
    />
  );
};

export default TopNavigation;
