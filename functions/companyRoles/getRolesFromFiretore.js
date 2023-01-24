const admin = require('firebase-admin');

const getRolesFromFiretore = async () => {
  try {
    // TODO: use query with limit criteria to limit number of roles returned.
    // TODO: Run filter criteria for getting unexpired roles.
    const querySnapshot = await admin.firestore().collection('companyRolesV2').get();

    if (querySnapshot.empty) {
      return null;
    }

    const roles = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    return roles;
  } catch (error) {
    console.error('Error: ', error);
  }
};

exports.getRolesFromFiretore = getRolesFromFiretore;
