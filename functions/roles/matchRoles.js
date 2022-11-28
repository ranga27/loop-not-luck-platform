const { getScores } = require('./getScores');
const { addRoleInFirestore } = require('./addMatchedRoleInUserDoc');
const { getRolesFromFiretore } = require('./getRolesFromFiretore');

const matchRoles = async (uid) => {
  const roles = await getRolesFromFiretore();
  if (roles) {
    roles.forEach((role) => {
      role.score = getScores(role);
      addRoleInFirestore(role, uid);
    });
  }
};
exports.matchRoles = matchRoles;
