/* eslint object-curly-spacing: ["error", "always"]*/
const functions = require('firebase-functions');
const { getAuth } = require('firebase-admin/auth');

/** Cloud Function that sets desired user role */
exports.setUserRole = functions.https.onCall((data) => {
  try {
    const { uid, role } = data;
    console.log(uid, role);
    // Set custom user claims on this user.
    getAuth().setCustomUserClaims(uid, { role: role });
    // TODO: update the 'users' collection with new role
    return true;
  } catch (error) {
    console.error('Error setting user role: ', error);
    throw new functions.https.HttpsError('Error', error.message, error);
  }
});
