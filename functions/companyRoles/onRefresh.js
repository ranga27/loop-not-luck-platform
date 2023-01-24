const functions = require('firebase-functions');
const { matchRoles } = require('./matchRoles');

exports.onRefreshV2 = functions.region('europe-west2').https.onCall((data) => {
  return matchRoles(data);
});
