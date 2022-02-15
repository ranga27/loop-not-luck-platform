const functions = require('firebase-functions');

exports.onProfileComplete = functions.firestore
  .document('profiles/candidates/completed/{uid}')
  .onCreate((snap) => {
    const newValue = snap.data();
    console.log(newValue);
  });
