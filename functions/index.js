const { initializeApp } = require('firebase-admin/app');
initializeApp();

const sendVerificationEmail = require('./user/sendVerificationEmail');

const sendJobs = require('./email/sendJobs');
const sendCandidateFeedback = require('./email/sendFeedback');
const matchRoles = require('./roles/matchRoles');
const matchNewRoles = require('./roles/matchNewRoles');
const sendSms = require('./sms/sendSms');

exports.auth = require('./auth/index');
exports.user = require('./user/index');

/* exports.sendJobs = sendJobs.sendJobs;
exports.sendCandidateFeedback = sendCandidateFeedback.sendCandidateFeedback;
exports.onProfileCompleted = matchRoles.onProfileCompleted;
exports.onProfileUpdated = matchRoles.onProfileUpdated;
exports.getUpdatedMatchedRoles = matchRoles.getUpdatedMatchedRoles;
exports.onRoleWritten = matchNewRoles.onRoleWritten;
exports.sendSms = sendSms.sendSms; */
// TODO: secure the functions using appCheck token
