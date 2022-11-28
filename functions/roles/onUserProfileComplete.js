const functions = require('firebase-functions');
const { matchRoles } = require('./matchRoles');

exports.onUserProfileComplete = functions
  .region('europe-west2')
  .firestore.document('profiles/candidates/completed/{uid}')
  .onCreate(async (snap, context) => {
    await matchRoles(context.params.uid);
  });
