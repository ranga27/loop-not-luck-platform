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

const APP_NAME = 'Loop Not Luck';

/** Cloud Function that sends job recommendations to the user */
exports.sendCandidateFeedback = functions.https.onCall((data) => {
  return sendCandidateFeedbackEmail(data);
});
// [END sendWelcomeEmail]

// Sends the email to the given user.
async function sendCandidateFeedbackEmail(newData) {
  const mailOptions = {
    from: `${APP_NAME} <hello@loopnotluck.com>`,
    to: newData.email,
  };
  mailOptions.subject = `${newData.subject}`;
  if (newData.calendyLink) {
    mailOptions.html = `
    <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    </head>
    <body>
    <p style="white-space: pre-line;">${newData.emailText.replace(
      'book a meeting',
      `<a href=${newData.calendyLink}>book a meeting</a>`
    )}</p>

                </body>`;
  } else {
    mailOptions.text = `${newData.emailText}`;
  }

  await mailTransport.sendMail(mailOptions);
  functions.logger.log(
    'Application Review Process email sent to:',
    newData.email
  );
  return null;
}
