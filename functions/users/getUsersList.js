const { onCall, HttpsError } = require('firebase-functions/v2/https');
const { getAuth } = require('firebase-admin/auth');

exports.getUsersList = onCall(
  {
    region: 'europe-west2',
  },
  async () => {
    try {
      const listUsersResult = await getAuth().listUsers();
      return listUsersResult.users.map(mapUser);
    } catch (error) {
      console.log('Error listing users: ', error.message);
      // Throwing an HttpsError so that the client gets the error details.
      throw new HttpsError('Error', error.message, error);
    }
  }
);

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
