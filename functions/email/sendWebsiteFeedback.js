/* eslint-disable no-unused-vars */
/* eslint-disable require-jsdoc */
/* eslint-disable comma-dangle */
/* eslint-disable indent */
/* eslint-disable max-len */
/* eslint object-curly-spacing: ["error", "always"]*/
const functions = require('firebase-functions');
const nodemailer = require('nodemailer');

const mailTransport = nodemailer.createTransport({
  host: 'smtp-relay.sendinblue.com',
  port: 465,
  auth: {
    user: 'sarang@loopnotluck.com',
    pass: '0MU6cxAR5wYsvZFD',
  },
});

const SUPPORT_EMAIL = 'kinjal@loopnotluck.com';

/** Cloud Function that sends job recommendations to the user */
exports.sendWebsiteFeedback = functions.https.onCall((data) => {
  return sendWebsiteFeedbackEmail(data);
});
// [END sendWebsiteFeedbackEmail]

// Sends the email to the given user.
async function sendWebsiteFeedbackEmail(newData) {
  const mailOptions = {
    from: `${newData.fullName} <${newData.email}>`,
    to: SUPPORT_EMAIL,
  };

  mailOptions.subject = `${newData.subject}`;

  mailOptions.text = `${newData.feedback}`;

  await mailTransport.sendMail(mailOptions);
  functions.logger.log(`Website feedback email sent to: ${SUPPORT_EMAIL}`);
  return null;
}
