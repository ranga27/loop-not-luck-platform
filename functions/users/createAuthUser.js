//cloud functions have higher access control so firebase-admin helps, allows us to bypass the security rules
const admin = require('firebase-admin');

exports.createAuthUser = async (newUserInfo) => {
  const auth = admin.auth();
  const { email, password } = newUserInfo;

  const newUser = await auth.createUser({
    email,
    password,
  });

  return newUser.uid;
};
