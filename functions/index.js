const functions = require('firebase-functions');
const { initializeApp } = require('firebase-admin/app');
const { getAuth } = require('firebase-admin/auth');

initializeApp();

/** Cloud Function that sets desired user role */
exports.setUserRole = functions.https.onCall((data) => {
  try {
    const { uid, role } = data;
    console.log(uid, role);
    // Set custom user claims on this user.
    getAuth().setCustomUserClaims(uid, { role: role });
    return true;
  } catch (error) {
    console.error('Error setting user role: ', error);
    throw new functions.https.HttpsError('Error', error.message, error);
  }
});

const mapUser = (user) => {
  console.log(user);
  const customClaims = user.customClaims || { role: '' };
  const role = customClaims.role ? customClaims.role : '';
  const item = {
    uid: user.uid,
    email: user.email,
    role,
  };
  return item;
};

exports.getUsersList = functions.https.onCall(async () => {
  try {
    const listUsersResult = await getAuth().listUsers();
    return listUsersResult.users.map(mapUser);
  } catch (error) {
    console.log('Error listing users: ', error.message);
    throw new functions.https.HttpsError('Error', error.message, error);
  }
});
