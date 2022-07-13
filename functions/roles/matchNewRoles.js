const functions = require('firebase-functions');
const admin = require('firebase-admin');

exports.onRoleWritten = functions.firestore
  .document('roles/{roleId}')
  .onWrite(async (change, context) => {
    try {
      // Check if algorithm already running
      const configRef = admin.firestore().doc('configs/roles');
      const rolesConfigSnapshot = await configRef.get();
      if (rolesConfigSnapshot)
        console.log('Being Matched', rolesConfigSnapshot.data().beingMatched);
      // Access the parameter `{roleId}` with `context.params`
      const roleId = context.params.roleId;
      console.log('Role doc written in firestore: ', roleId);
      return;
    } catch (error) {
      console.log(error.message);
    }
  });
