/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

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

export const getUsersList = functions.https.onCall(async (data, context) => {
  try {
    const listUsers = await admin.auth().listUsers();
    const users = listUsers.users.map(mapUser);
    return { users, error: null };
  } catch (error) {
    console.log('Error listing users: ', error.message);
    return { users: null, error: error.message };
  }
});
