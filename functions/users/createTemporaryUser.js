const admin = require('firebase-admin');
const { v4: uuid } = require('uuid');

exports.createTemporaryUser = async (authUid, newUserInfo) => {
  const store = admin.firestore();
  const { email, firstName, company } = newUserInfo;
  const confirmationHash = uuid();
  const createdAt = Date.now();
  const tempUserInfo = {
    authUid,
    email,
    firstName,
    company,
    confirmationHash,
    createdAt,
  };

  return store.collection('temporaryUsers').doc().set(tempUserInfo);
};
