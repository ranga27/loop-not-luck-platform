/* eslint-disable no-unused-vars */
/* eslint-disable require-jsdoc */
/* eslint-disable comma-dangle */
/* eslint-disable indent */
/* eslint-disable max-len */
/* eslint object-curly-spacing: ["error", "always"]*/
const functions = require('firebase-functions/v1');
const nodemailer = require('nodemailer');
const { sendEmail } = require('./sendFeedbackEmail');

const SUPPORT_EMAIL = 'hello@loopnotluck.com';

/** Cloud Function that sends job recommendations to the user */
exports.sendWebsiteFeedback = functions
  .region('europe-west2')
  .runWith({ secrets: ['NODEMAILER_AUTH_PASSWORD'] })
  .https.onCall((newData) => {
    const transporter = nodemailer.createTransport({
      host: process.env.NODEMAILER_HOST_URL,
      port: process.env.NODEMAILER_PORT,
      secure: true,
      auth: {
        user: process.env.NODEMAILER_AUTH_USER,
        pass: process.env.NODEMAILER_AUTH_PASSWORD,
      },
    });

    return sendEmail({
      to: SUPPORT_EMAIL,
      from: `${newData.fullName} <${newData.email}>`,
      fullName: newData.fullName,
      email: newData.email,
      message: newData.feedback,
      subject: newData.subject,
      transporter,
    });
  });
