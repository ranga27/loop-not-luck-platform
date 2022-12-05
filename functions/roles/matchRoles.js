const { getScores } = require('./getScores');
const { addRoleInFirestore } = require('./addMatchedRoleInUserDoc');
const { getRolesFromFiretore } = require('./getRolesFromFiretore');
const { getCandidateFromFirestore } = require('./getCandidateFromFirestore');

/**
 *
 * @param {String} candidateUid
 */
const matchRoles = async (candidateUid) => {
  try {
    const roles = await getRolesFromFiretore();
    const candidate = await getCandidateFromFirestore(candidateUid);

    if (!roles) throw new Error('No roles found');
    if (!candidate) throw new Error('No candidate found');

    roles.forEach((role) => {
      role.score = getScores(role, candidate);
      addRoleInFirestore(role, candidateUid);
    });
  } catch (error) {
    console.error('Error: ', error);
  }
};

exports.matchRoles = matchRoles;
