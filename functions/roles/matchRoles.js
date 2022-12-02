const { getScores } = require('./getScores');
const { addRoleInFirestore } = require('./addMatchedRoleInUserDoc');
const { getRolesFromFiretore } = require('./getRolesFromFiretore');

/**
 *
 * @param {String} roleUid
 * @param {Object} candidate
 */
const matchRoles = async (roleUid, candidate) => {
  const roles = await getRolesFromFiretore();

  if (roles) {
    roles.forEach((role) => {
      role.score = getScores(role, candidate);
      addRoleInFirestore(role, roleUid);
    });
  }
};
exports.matchRoles = matchRoles;
