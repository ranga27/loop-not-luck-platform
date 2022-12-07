const confirmEmail = require('./confirmEmail');
const sendVerificationEmail = require('./sendVerificationEmail');
const { sendWebsiteFeedback } = require('./sendWebsiteFeedback');

exports.confirmEmail = confirmEmail.confirmEmail;
exports.sendVerificationEmail = sendVerificationEmail.sendVerificationEmail;
exports.sendWebsiteFeedback = sendWebsiteFeedback;
