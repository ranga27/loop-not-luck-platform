const functions = require('firebase-functions');
const { createAuthUser } = require('./createAuthUser');
const { createTemporaryUser } = require('./createTemporaryUser');

/**
 * This function handles new user sign up calls from client
 */
exports.createAccount = functions.https.onCall((data) => {
  return createAccount(data);
});

async function createAccount(data) {
  //get new user info sent by FE in the request
  const newUserInfo = data;

  //create new user in firebase auth
  const authUid = await createAuthUser(newUserInfo);

  //create temp user doc inside temp user collection until email verified
  await createTemporaryUser(authUid, newUserInfo);

  //TODO: add an alert to send to admin when new users signup
}
