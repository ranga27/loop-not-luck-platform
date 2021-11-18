/* eslint-disable no-unused-vars */
/* eslint-disable object-shorthand */
/* eslint-disable no-console */
const admin = require('firebase-admin');
const functions = require('firebase-functions');

admin.initializeApp();

/** Cloud Function that sets desired user role */
exports.setUserRole = functions.https.onCall(async (data) => {
  try {
    const { uid, role } = data;
    console.log(uid, role);
    await admin.auth().setCustomUserClaims(uid, { role: role });
    return true;
  } catch (error) {
    console.error('Error setting user role: ', error);
    throw error;
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

exports.getUsersList = functions.https.onCall(async (data) => {
  try {
    const listUsers = await admin.auth().listUsers();
    const users = listUsers.users.map(mapUser);
    return users;
  } catch (error) {
    console.log('Error listing users: ', error.message);
    throw error;
  }
});
