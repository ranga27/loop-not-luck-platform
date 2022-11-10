const admin = require('firebase-admin');

const addMatchedRoleInUserDoc = async (role, uid) => {
  const { id, ...data } = role;
  const roleRef = admin
    .firestore()
    .collection('users')
    .doc(uid)
    .collection('matchedRoles')
    .doc(id);
  await roleRef.set({ ...data }, { merge: true });
};
exports.addRoleInFirestore = addMatchedRoleInUserDoc;
