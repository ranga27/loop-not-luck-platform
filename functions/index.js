/* eslint object-curly-spacing: ["error", "always"]*/
const admin = require('firebase-admin');
const setUserRole = require('./users/setUserRole');
const getUsersList = require('./users/getUsersList');
const sendJobs = require('./email/sendJobs');
const sendCandidateFeedback = require('./email/sendFeedback');
const matchRoles = require('./roles/matchRoles');
const createAccount = require('./users/createAccount');
const sendVerificationEmail = require('./users/sendVerificationEmail');
const confirmEmail = require('./users/confirmEmail');
admin.initializeApp();

exports.setUserRole = setUserRole.setUserRole;
exports.getUsersList = getUsersList.getUsersList;
exports.sendJobs = sendJobs.sendJobs;
exports.sendCandidateFeedback = sendCandidateFeedback.sendCandidateFeedback;
exports.onProfileCompleted = matchRoles.onProfileCompleted;
exports.onProfileUpdated = matchRoles.onProfileUpdated;
exports.getUpdatedMatchedRoles = matchRoles.getUpdatedMatchedRoles;
exports.createAccount = createAccount.createAccount;
exports.sendVerificationEmail = sendVerificationEmail.sendVerificationEmail;
exports.confirmEmail = confirmEmail.confirmEmail;
// TODO: secure the functions using appCheck token
