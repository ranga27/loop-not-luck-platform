const functions = require('firebase-functions');
const { getAuth } = require('firebase-admin/auth');

exports.getUsers = functions.region('europe-west2').https.onCall(async () => {
  try {
    const userList = await getAuth().listUsers();
    return userList.users.map(mapUser);
  } catch (error) {
    // Throwing an HttpsError so that the client gets the error details.
    throw new functions.https.HttpsError('Error', error.message, error);
  }
});

const mapUser = (user) => {
  const customClaims = user.customClaims || { role: '' };
  const role = customClaims.role ? customClaims.role : '';
  const item = {
    uid: user.uid,
    email: user.email,
    role,
  };
  return item;
};
