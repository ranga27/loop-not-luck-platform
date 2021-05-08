/* eslint-disable no-console */
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

export const getUsersList = functions.https.onRequest(async (req, res) => {
  admin
    .auth()
    .listUsers(1000)
    .then((listUsersResult) => {
      listUsersResult.users.forEach((userRecord) => {
        console.log(
          'User: uid:',
          userRecord.uid,
          ' email:',
          userRecord.email,
          ' customClaims:',
          userRecord.customClaims
        );
      });
      res.end('Retrieved all users successfully.');
    })
    .catch((error) => {
      console.log('Error listing users:', error);
    });
});
