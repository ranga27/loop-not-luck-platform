const functions = require('firebase-functions');
const { matchRoles } = require('./matchRoles');

exports.onUserProfileUpdateV2 = functions
  .region('europe-west2')
  .firestore.document('profiles/candidates/updated/{uid}')
  .onWrite(async (change, context) => {
    await matchRoles(context.params.uid);
  });
