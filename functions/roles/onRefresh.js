const functions = require('firebase-functions');
const { getScores } = require('./getScores');
const { addRoleInFirestore } = require('./addMatchedRoleInUserDoc');
const { getRolesFromFiretore } = require('./getRolesFromFiretore');

exports.onRefresh = functions.region('europe-west2').https.onCall((data) => {
  return runMatching(data);
});

async function runMatching(data) {
  const uid = data;
  const roles = await getRolesFromFiretore();
  if (roles) {
    roles.forEach((role) => {
      role.score = getScores(role);
      addRoleInFirestore(role, uid);
    });
  }
}
