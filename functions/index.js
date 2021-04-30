require('regenerator-runtime/runtime');
// eslint-disable-next-line no-unused-vars
const functions = require('firebase-functions');
const builtFunctions = require('./build');

Object.keys(builtFunctions).forEach((functionName) => {
  exports[functionName] = builtFunctions[functionName];
});
