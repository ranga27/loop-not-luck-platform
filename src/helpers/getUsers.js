const admin = require('firebase-admin');

const serviceAccount = require('../api/services/loop-luck-firebase-adminsdk-dnw25-b37e5c34c1.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://loop-luck.firebaseio.com',
});

const listAllUsers = () => {
  // List batch of users, 1000 at a time.
  admin
    .auth()
    .listUsers(1000)
    .then((listUsersResult) => {
      listUsersResult.users.forEach((userRecord) => {
        console.log('user', userRecord.toJSON());
      });
    })
    .catch((error) => {
      console.log('Error listing users:', error);
    });
};
// Start listing users from the beginning, 1000 at a time.
listAllUsers();
