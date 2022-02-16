const functions = require('firebase-functions');
const admin = require('firebase-admin');

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
  });

exports.onProfileUpdated = functions.firestore
  .document('profiles/candidates/updated/{uid}')
  .onWrite(async (change, context) => {
    const uid = context.params.uid;
    const querySnapshot = await admin
      .firestore()
      .collection('users')
      .doc(uid)
      .get();
    const roles = await getRolesFromFiretore();
    if (roles) {
      roles.forEach(getScores);
    }
    console.log('Received roles from firestore: ', roles.length);
  });

const getRolesFromFiretore = async () => {
  // TODO: use query with limit criteria to limit number of roles returned.
  // TODO: Run filter criteria for getting roles.
  const querySnapshot = await admin
    .firestore()
    .collection('opportunities')
    .get();
  const roles = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  return roles;
};

const getScores = () => {};
