const functions = require('firebase-functions');
const admin = require('firebase-admin');
const { getScores } = require('./getScores');
const { addRoleInFirestore } = require('./addRoleInFirestore');
const { getRolesFromFiretore } = require('./getRolesFromFiretore');

exports.onUserProfileComplete = functions
  .region('europe-west2')
  .firestore.document('profiles/candidates/completed/{uid}')
  .onCreate(async (snap, context) => {
    // Access the parameter `{uid}` with `context.params`
    const uid = context.params.uid;
    const querySnapshot = await admin
      .firestore()
      .collection('users')
      .doc(uid)
      .get();
    console.log('Profile completed for user: ', querySnapshot.data());
    const roles = await getRolesFromFiretore();
    if (roles) {
      roles.forEach((role) => {
        role.score = getScores(role);
        addRoleInFirestore(role, uid);
      });
    }
    console.log('Received roles from firestore: ', roles.length);
  });
