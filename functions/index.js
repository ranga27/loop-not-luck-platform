/* eslint object-curly-spacing: ["error", "always"]*/
const { initializeApp } = require('firebase-admin/app');
const setUserRole = require('./users/setUserRole');
const getUsersList = require('./users/getUsersList');
const sendJobs = require('./email/sendJobs');
const matchRoles = require('./roles/matchRoles');
initializeApp();

exports.setUserRole = setUserRole.setUserRole;
exports.getUsersList = getUsersList.getUsersList;
exports.sendJobs = sendJobs.sendJobs;
exports.onProfileComplete = matchRoles.onProfileComplete;
// TODO: secure the functions using appCheck token
