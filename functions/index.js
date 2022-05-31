/* eslint object-curly-spacing: ["error", "always"]*/
const admin = require('firebase-admin');
const setUserRole = require('./users/setUserRole');
const getUsersList = require('./users/getUsersList');
const sendJobs = require('./email/sendJobs');
const sendCandidateFeedback = require('./email/sendFeedback');
const matchRoles = require('./roles/matchRoles');
admin.initializeApp();

exports.setUserRole = setUserRole.setUserRole;
exports.getUsersList = getUsersList.getUsersList;
exports.sendJobs = sendJobs.sendJobs;
exports.sendCandidateFeedback = sendCandidateFeedback.sendCandidateFeedback;
exports.onProfileCompleted = matchRoles.onProfileCompleted;
exports.onProfileUpdated = matchRoles.onProfileUpdated;
exports.getUpdatedMatchedRoles = matchRoles.getUpdatedMatchedRoles;
// TODO: secure the functions using appCheck token
