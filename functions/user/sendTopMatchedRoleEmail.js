const functions = require('firebase-functions/v1');
const nodemailer = require('nodemailer');
const admin = require('firebase-admin');
const { sendTopMatchEmail } = require('./sendTopMatchEmail');

exports.sendTopMatchedRoleEmail = functions
  .region('europe-west2')
  .runWith({ secrets: ['NODEMAILER_AUTH_PASSWORD'] })
  .firestore.document('users/{userid}/matchedRoles/{uid}')
  .onUpdate(async (snapshot, context) => {
    const {
      score: updatedScore,
      company,
      website: companyWeb,
      description,
    } = snapshot.after.data();

    if (updatedScore < 75) {
      return;
    }
    const store = admin.firestore();
    const querySnapshot = await store
      .collection('users')
      .doc(context.params.userid)
      .get();

    const { email, firstName } = querySnapshot.data();

    const transporter = nodemailer.createTransport({
      host: process.env.NODEMAILER_HOST_URL,
      port: process.env.NODEMAILER_PORT,
      secure: true,
      auth: {
        user: process.env.NODEMAILER_AUTH_USER,
        pass: process.env.NODEMAILER_AUTH_PASSWORD,
      },
    });

    return sendTopMatchEmail({
      to: email,
      from: 'Loop Not Luck hello@loopnotluck.com',
      subject: 'Woho Hooo! You matched the role..75%',
      firstName,
      updatedScore,
      company,
      companyWeb,
      description,
      roleLink: `${process.env.TOP_MATCH_ROLE_URL}`,
      transporter,
    });
  });
