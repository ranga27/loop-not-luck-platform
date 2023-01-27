const confirmEmail = require('./confirmEmail');
const sendVerificationEmail = require('./sendVerificationEmail');
const { sendWebsiteFeedback } = require('./sendWebsiteFeedback');
const { sendTopMatchedRoleEmail } = require('./sendTopMatchedRoleEmail');
const { sendSaperateEmail } = require('./sendSaperateEmail');
const {
  sendCompanyVerificationEmail,
} = require('./sendCompanyVerificationEmail');
const { companyEmailConformation } = require('./companyEmailConformation');

exports.confirmEmail = confirmEmail.confirmEmail;
exports.sendVerificationEmail = sendVerificationEmail.sendVerificationEmail;
exports.sendWebsiteFeedback = sendWebsiteFeedback;
exports.sendTopMatchedRoleEmail = sendTopMatchedRoleEmail;
exports.sendSaperateEmail = sendSaperateEmail;
exports.sendCompanyVerificationEmail = sendCompanyVerificationEmail;
exports.companyEmailConformation = companyEmailConformation;
