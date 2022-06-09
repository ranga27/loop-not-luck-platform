const functions = require('firebase-functions');
const admin = require('firebase-admin');

exports.confirmEmail = functions.https.onRequest(async (req, res) => {
  const confirmationHash = req.query.conf;
  const auth = admin.auth();
  const store = admin.firestore();

  const querySnapshot = await store
    .collection('temporaryUsers')
    .where('confirmationHash', '==', confirmationHash)
    .get();

  if (querySnapshot.size === 0) {
    return res.redirect(
      'https://loopnotluck.web.app/email-confirmation/failure'
    );
  }

  const temporaryUserDoc = querySnapshot.docs[0];

  const { authUid, email, firstName, company } = temporaryUserDoc.data();

  await auth.updateUser(authUid, { emailVerified: true });
  await store.collection('users').doc(authUid).set({
    email,
    firstName,
    company,
  });
  await store.collection('temporaryUsers').doc(temporaryUserDoc.id).delete();
  return res.redirect('https://loopnotluck.web.app/email-confirmation/success');
});
