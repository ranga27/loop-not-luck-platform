/* eslint-disable object-shorthand */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

export const setUserRole = functions.https.onCall(async (data, context) => {
  try {
    const { uid, role } = data;
    console.log(uid, role);
    await admin.auth().setCustomUserClaims(uid, { role: role });
    return true;
  } catch (error) {
    console.error('Error setting user role: ', error);
    return error;
  }
});
