import React from 'react';
import { NavLink } from 'react-router-dom';
import Layout from '../../layout/Layout';

const SuccessMessage = () => (
  <Layout>
    <h1>Thanks for confirming!</h1>
    <h3>
      Woohoo! Now that you have confirmed your email, please{' '}
      <NavLink to="/login" style={{ color: 'green' }}>
        login
      </NavLink>{' '}
      to finish your profile.
    </h3>
  </Layout>
);

const FailureMessage = () => (
  <Layout>
    <h1>Uh oh...</h1>
    <h3>
      It looks like something went wrong with your confirmation. If you waited a
      while since creating your account, you may have to{' '}
      <NavLink to="/register" style={{ color: 'green' }}>
        create
      </NavLink>{' '}
      it again.
    </h3>
  </Layout>
);

/*
    This is the page/component that the user will land on
    when they attempt to confirm their email. We'll have Firebase
    send them to either the "success" or "failure" route, depending
    on whether or not their confirmation was successful.
*/
const EmailConfirmation = ({ success }) => {
  return success ? <SuccessMessage /> : <FailureMessage />;
};

export default EmailConfirmation;
