const functions = require('firebase-functions');
const { sendEmail } = require('./sendEmail');
const admin = require('firebase-admin');

exports.sendVerificationEmail = functions.firestore
  .document('temporaryUsers/{uid}')
  .onCreate(async (snapshot, context) => {
    const uid = context.params.uid;
    const querySnapshot = await admin
      .firestore()
      .collection('temporaryUsers')
      .doc(uid)
      .get();
    console.log('Testing for user: ', querySnapshot.data());

    const tempUserInfo = snapshot.data();
    const { email, confirmationHash, firstName } = tempUserInfo;

    return sendEmail({
      to: email,
      from: 'hello@loopnotluck.com',
      subject: 'Get In the Loop - Verify Your Email!',
      firstName,
      message: `https://us-central1-loopnotluck.cloudfunctions.net/confirmEmail?conf=${confirmationHash}`,
    });
  });
