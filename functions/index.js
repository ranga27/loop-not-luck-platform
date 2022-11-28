const { initializeApp } = require('firebase-admin/app');
initializeApp();

exports.auth = require('./auth/index');
exports.user = require('./user/index');
exports.roles = require('./roles/index');

// TODO: secure the functions using appCheck token
