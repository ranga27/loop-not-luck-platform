/* eslint-disable import/prefer-default-export */
// TODO: move this to DB config
export const getUserError = (message) => {
  switch (true) {
    case /internal/i.test(message):
      return 'Please contact support: hello@loopnotluck.com';
    case /network-request-failed/i.test(message):
      return 'Network error, please try again or contact support: hello@loopnotluck.com';
    case /email-already-in-use/i.test(message):
      return 'Email already in use, try to login';
    case /email-not-verified/i.test(message):
      return 'Email Verification pending, please check your emails';
    case /weak-password/i.test(message):
      return 'The password is not strong enough.';
    case /user-not-found/i.test(message):
      return 'The user with this email does not exist, please register';
    case /no-user-data/i.test(message):
      return 'User Data not found! Contact support: hello@loopnotluck.com';
    case /wrong-password/i.test(message):
      return 'Incorrect password, please try again or reset password';
    case /the-service-is-currently-unavailable/i.test(message):
      return 'Service unavailable, please try again or contact support: hello@loopnotluck.com';
    default:
      return message;
  }
};
