const confirmEmail = require('./confirmEmail');
const sendVerificationEmail = require('./sendVerificationEmail');
const { sendWebsiteFeedback } = require('./sendWebsiteFeedback');
const { sendTopMatchedRoleEmail } = require('./sendTopMatchedRoleEmail');
const { sendSaperateEmail } = require('./sendSaperateEmail');

exports.confirmEmail = confirmEmail.confirmEmail;
exports.sendVerificationEmail = sendVerificationEmail.sendVerificationEmail;
exports.sendWebsiteFeedback = sendWebsiteFeedback;
exports.sendTopMatchedRoleEmail = sendTopMatchedRoleEmail;
exports.sendSaperateEmail = sendSaperateEmail;
