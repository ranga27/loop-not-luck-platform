const functions = require('firebase-functions');
const { getScores } = require('./getScores');
const { addRoleInFirestore } = require('./addRoleInFirestore');
const { getRolesFromFiretore } = require('./getRolesFromFiretore');

exports.onUserProfileUpdate = functions
  .region('europe-west2')
  .firestore.document('profiles/candidates/updated/{uid}')
  .onWrite(async (change, context) => {
    const uid = context.params.uid;
    console.log('Profile updated for uid: ', uid);
    const roles = await getRolesFromFiretore();
    if (roles) {
      roles.forEach((role) => {
        role.score = getScores(role);
        // TODO: write a test case to check if this is overwriting the roles, it should be a merge since some roles matchedRoles collection are already saved/applied
        addRoleInFirestore(role, uid);
      });
    }
    console.log('Received roles from firestore: ', roles.length);
  });
