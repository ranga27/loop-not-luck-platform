/* eslint-disable import/prefer-default-export */
export const getUserError = (message) => {
  switch (true) {
    case /internal/i.test(message):
      return 'Please contact support: hello@loopnotluck.com';
    case /email-already-in-use/i.test(message):
      return 'Email already in use, try to login';
    case /weak-password/i.test(message):
      return 'The password is not strong enough.';
    case /user-not-found/i.test(message):
      return 'The user with this email does not exist, please register';
    case /wrong-password/i.test(message):
      return 'Incorrect password, please try again or reset password';
    case /the-service-is-currently-unavailable/i.test(message):
      return 'Registration service unavailable, try again';
    default:
      return message;
  }
};
