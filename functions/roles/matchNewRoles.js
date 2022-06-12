const functions = require('firebase-functions');

exports.onRoleWritten = functions.firestore
  .document('roles/{roleId}')
  .onWrite((change, context) => {
    // Access the parameter `{roleId}` with `context.params`
    const roleId = context.params.roleId;
    const data = change.after.data();
    console.log('Role doc created/updated in firestore: ', roleId);
    console.log('New role data: ', data);
  });
