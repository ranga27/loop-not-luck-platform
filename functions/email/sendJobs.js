/* eslint-disable require-jsdoc */
/* eslint-disable comma-dangle */
/* eslint-disable indent */
/* eslint-disable max-len */
/* eslint object-curly-spacing: ["error", "always"]*/
const functions = require('firebase-functions');
const nodemailer = require('nodemailer');

const mailTransport = nodemailer.createTransport({
  host: 'smtp-relay.sendinblue.com',
  port: 587,
  auth: {
    user: 'sarang@loopnotluck.com',
    pass: '0MU6cxAR5wYsvZFD',
  },
});

const APP_NAME = 'Loop Not Luck';

/** Cloud Function that sends job recommendations to the user */
exports.sendJobs = functions.https.onCall((data) => {
  // [START eventAttributes]
  const email = data.email; // The email of the user.
  const displayName = data.displayName; // The display name of the user.
  // [END eventAttributes]

  return sendJobsEmail(data);
});
// [END sendWelcomeEmail]

// Sends the recommendation email to the given user.
async function sendJobsEmail(email, firstName) {
  const mailOptions = {
    from: `${APP_NAME} <hello@loopnotluck.com>`,
    to: email,
  };

  // The user subscribed to the newsletter.
  mailOptions.subject = `Job recommendations from ${APP_NAME}!`;
  mailOptions.text = `Hey ${
    firstName || ''
  }! Welcome to ${APP_NAME}. I hope you will enjoy our service.`;
  await mailTransport.sendMail(mailOptions);
  functions.logger.log('Job recommendation email sent to:', email);
  return null;
}
