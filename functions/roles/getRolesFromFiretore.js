const admin = require('firebase-admin');

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
exports.getRolesFromFiretore = getRolesFromFiretore;
