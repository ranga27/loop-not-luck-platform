/* eslint object-curly-spacing: ["error", "always"]*/
const { initializeApp } = require('firebase-admin/app');
const setUserRole = require('./setUerRole');
const getUsersList = require('./getUsersList');

initializeApp();

exports.setUserRole = setUserRole.setUserRole;
exports.getUsersList = getUsersList.getUsersList;
// TODO: secure the functions using appCheck token
