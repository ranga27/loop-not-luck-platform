/* eslint object-curly-spacing: ["error", "always"]*/
const functions = require('firebase-functions');
const { getAuth } = require('firebase-admin/auth');

exports.getUsersList = functions.https.onCall(async () => {
  try {
    const listUsersResult = await getAuth().listUsers();
    return listUsersResult.users.map(mapUser);
  } catch (error) {
    console.log('Error listing users: ', error.message);
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
