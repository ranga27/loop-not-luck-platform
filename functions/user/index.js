const confirmEmail = require('./confirmEmail');
const sendVerificationEmail = require('./sendVerificationEmail');
const { sendWebsiteFeedback } = require('./sendWebsiteFeedback');
const { sendTopMatchedRoleEmail } = require('./sendTopMatchedRoleEmail');
const {
  sendTopMatchedCompanyRoleEmail,
} = require('./sendTopMatchedCompanyRoleEmail');
const { sendSeparateEmail } = require('./sendSeparateEmail');

exports.confirmEmail = confirmEmail.confirmEmail;
exports.sendVerificationEmail = sendVerificationEmail.sendVerificationEmail;
exports.sendWebsiteFeedback = sendWebsiteFeedback;
exports.sendTopMatchedRoleEmail = sendTopMatchedRoleEmail;
exports.sendTopMatchedCompanyRoleEmail = sendTopMatchedCompanyRoleEmail;
exports.sendSeparateEmail = sendSeparateEmail;
