const functions = require('firebase-functions');
const admin = require('firebase-admin');
const { FieldValue } = require('firebase-admin/firestore');

exports.confirmEmail = functions
  .region('europe-west2')
  .https.onRequest(async (req, res) => {
    const confirmationHash = req.query.conf;

    const auth = admin.auth();
    const store = admin.firestore();

    const querySnapshot = await store
      .collection('temporaryUsers')
      .where('confirmationHash', '==', confirmationHash)
      .get();
    if (querySnapshot.size === 0) {
      return res.redirect(`${process.env.FAILURE_URL}`);
    }
    const temporaryUserDoc = querySnapshot.docs[0];
    const { uid, email, firstName, role } = temporaryUserDoc.data();
    await auth.updateUser(uid, { emailVerified: true });
    await store.collection('users').doc(uid).set({
      email,
      firstName,
      role,
      createdAt: FieldValue.serverTimestamp(),
      isOnboarded: false,
      hasCompletedProfile: false,
    });
    auth.setCustomUserClaims(uid, { role: role });
    await store.collection('temporaryUsers').doc(temporaryUserDoc.id).delete();
    return res.redirect(`${process.env.SUCCESS_URL}`);
  });
