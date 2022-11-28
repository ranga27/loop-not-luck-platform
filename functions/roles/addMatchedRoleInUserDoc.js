const admin = require('firebase-admin');

// TODO: write a test case to check if this is overwriting the roles, it should be a merge since some roles in matchedRoles collection are already applied. Applied roles must not be updated.
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
