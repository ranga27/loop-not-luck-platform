/* eslint-disable import/prefer-default-export */
export const getUserError = (message) => {
  switch (true) {
    case /internal/i.test(message):
      return 'Please contact support: hello@loopnotluck.com';
    case /email-already-in-use/i.test(message):
      return 'Email already in use, try logging';
    case /weak-password/i.test(message):
      return 'The password is not strong enough.';
    case /user-not-found/i.test(message):
      return 'The user with this email does not exist, please register';
    default:
      return message;
  }
};
