const { onCall, HttpsError } = require('firebase-functions/v2/https');
const { getAuth } = require('firebase-admin/auth');

/** Cloud Function that sets desired user role */
exports.setUserRole = onCall(
  {
    region: 'europe-west2',
  },
  ({ uid, role }) => {
    try {
      // Set custom user claims on this user.
      getAuth().setCustomUserClaims(uid, { role: role });
      // TODO: update the 'users' collection with new role
      return true;
    } catch (error) {
      console.error('Error setting user role: ', error);
      // Throwing an HttpsError so that the client gets the error details.
      throw new HttpsError('Error', error.message, error);
    }
  }
);
