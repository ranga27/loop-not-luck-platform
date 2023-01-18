import React from 'react';
import { Button } from 'reactstrap';
import IntlMessages from '../helpers/IntlMessages';

const getDataAttribute = (label) => {
  const attributes = {
    'user.login-button': 'login-submit-button',
    'user.register-button': 'register-submit-button',
    'pages.submit': 'forgot-password-submit-button',
  };
  return attributes[label];
};

// TODO: Styled Button using styled components
const AuthButton = ({ loading, label }) => {
  return (
    <Button
      color="primary"
      type="submit"
      className={`btn-shadow mt-4 btn-multiple-state ${
        loading ? 'show-spinner' : ''
      }`}
      size="lg"
      data-cy={getDataAttribute(label)}
    >
      <span className="spinner d-inline-block">
        <span className="bounce1" />
        <span className="bounce2" />
        <span className="bounce3" />
      </span>
      <span className="label">
        <IntlMessages id={label} />
      </span>
    </Button>
  );
};

export default AuthButton;
