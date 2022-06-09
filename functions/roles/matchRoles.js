/* eslint-disable no-unused-vars */
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const { getScores } = require('./getScores');

exports.onProfileCompleted = functions.firestore
  .document('profiles/candidates/completed/{uid}')
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

exports.onProfileUpdated = functions.firestore
  .document('profiles/candidates/updated/{uid}')
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

const getRolesFromFiretore = async () => {
  // TODO: use query with limit criteria to limit number of roles returned.
  // TODO: Run filter criteria for getting unexpired roles.
  const querySnapshot = await admin.firestore().collection('roles').get();
  const roles = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  return roles;
};

const addRoleInFirestore = async (role, uid) => {
  const { id, ...data } = role;
  const roleRef = admin
    .firestore()
    .collection('users')
    .doc(uid)
    .collection('matchedRoles')
    .doc(id);
  await roleRef.set({ ...data }, { merge: true });
};

exports.getUpdatedMatchedRoles = functions.https.onCall((data) => {
  return onRefreshRoles(data);
});

async function onRefreshRoles(data) {
  const uid = data;
  const roles = await getRolesFromFiretore();
  if (roles) {
    roles.forEach((role) => {
      role.score = getScores(role);
      addRoleInFirestore(role, uid);
    });
  }
}
