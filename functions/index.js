/* eslint object-curly-spacing: ["error", "always"]*/
const { initializeApp } = require('firebase-admin/app');
initializeApp();

const setUserRole = require('./users/setUserRole');
const getUsersList = require('./users/getUsersList');
const sendJobs = require('./email/sendJobs');
const sendCandidateFeedback = require('./email/sendFeedback');
const matchRoles = require('./roles/matchRoles');
const sendVerificationEmail = require('./users/sendVerificationEmail');
const confirmEmail = require('./users/confirmEmail');
const matchNewRoles = require('./roles/matchNewRoles');
const sendSms = require('./sms/sendSms');

exports['set-user-role'] = setUserRole.setUserRole;
exports['get-users-list'] = getUsersList.getUsersList;
exports.sendJobs = sendJobs.sendJobs;
exports.sendCandidateFeedback = sendCandidateFeedback.sendCandidateFeedback;
exports.onProfileCompleted = matchRoles.onProfileCompleted;
exports.onProfileUpdated = matchRoles.onProfileUpdated;
exports.getUpdatedMatchedRoles = matchRoles.getUpdatedMatchedRoles;
exports.sendVerificationEmail = sendVerificationEmail.sendVerificationEmail;
exports['confirm-email'] = confirmEmail.confirmEmail;
exports.onRoleWritten = matchNewRoles.onRoleWritten;
exports.sendSms = sendSms.sendSms;
// TODO: secure the functions using appCheck token
