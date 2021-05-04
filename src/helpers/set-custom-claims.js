const admin = require('firebase-admin');

const serviceAccount = require('../api/services/loop-luck-firebase-adminsdk-dnw25-b37e5c34c1.json');

const uid = process.argv[2];

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://loop-luck.firebaseio.com',
});

admin
  .auth()
  .setCustomUserClaims(uid, { superAdmin: true, accessLevel: 0 })
  .then(() => {
    console.log('custom claims set for user', uid);
    process.exit();
  })
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
