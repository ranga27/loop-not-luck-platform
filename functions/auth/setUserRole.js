const functions = require('firebase-functions');
const { getAuth } = require('firebase-admin/auth');

/** Cloud Function that sets desired user role */
exports.setUserRole = functions
  .region('europe-west2')
  .https.onCall(async ({ uid, role }) => {
    try {
      // Set custom user claims on this user.
      getAuth().setCustomUserClaims(uid, { role: role });
      // TODO: update the firestore 'users' collection with new role
      return true;
    } catch (error) {
      // Throwing an HttpsError so that the client gets the error details.
      throw new functions.https.HttpsError('Error', error.message, error);
    }
  });
