const functions = require('firebase-functions');
const admin = require('firebase-admin');

exports.onWrite = functions
  .region('europe-west2')
  .firestore.document('roles/{roleId}')
  .onWrite(async (change, context) => {
    try {
      // Check if algorithm already running
      const configRef = admin.firestore().doc('config/roles');
      const snap = await configRef.get();
      if (snap) console.log('Being Matched', snap.data().beingMatched);
      // Access the parameter `{roleId}` with `context.params`
      const roleId = context.params.roleId;
      console.log('Role doc written in firestore: ', roleId);
      return;
    } catch (error) {
      console.log(error.message);
    }
  });
