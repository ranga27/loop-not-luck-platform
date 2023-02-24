/* eslint-disable no-unused-vars */
/* eslint-disable require-jsdoc */
/* eslint-disable comma-dangle */
/* eslint-disable indent */
/* eslint-disable max-len */
/* eslint object-curly-spacing: ["error", "always"]*/
const functions = require('firebase-functions/v1');
const cors = require('cors')({ origin: true });
const nodemailer = require('nodemailer');
const {
  applicationNotificationTemplate,
} = require('./applicationNotificationTemplate');

const SUPPORT_EMAIL = 'hello@loopnotluck.com';

const admin = require('firebase-admin');

exports.onApplyNotification = functions
  .region('europe-west2')
  .https.onRequest(async (req, res) => {
    cors(req, res, () => {
      const { companyEmail, userName, roleTitle, match, applyAt, companyName } =
        req.body;
      console.log(req.body);

      const transporter = nodemailer.createTransport({
        host: 'smtp-relay.sendinblue.com',
        port: 465,
        secure: true,
        auth: {
          user: 'sarang@loopnotluck.com',
          pass: '0MU6cxAR5wYsvZFD',
        },
      });

      return applicationNotificationTemplate({
        to: companyEmail,
        from: 'Loop Not Luck hello@loopnotluck.com',
        firstName: userName,
        roleTitle: roleTitle,
        match: match,
        appliedAt: applyAt,
        company: companyName,
        subject: `Loop Not Luck: Received Application on Role-${roleTitle}`,
        transporter,
      })
        .then(() => console.log('email sent!'))
        .catch((err) => console.log(err));
    });
  });
