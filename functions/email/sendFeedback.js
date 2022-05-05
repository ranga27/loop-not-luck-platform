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
  //   mailOptions.text = `Hey ${newData.name}! ${newData.body} Book a meeting with me here: ${newData.calendyLink}. Preferred date: ${newData.prescreeningDate}.`;
  (mailOptions.html = `
    <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
    @media screen and (max-width: 720px) {
        body .c-v84rpm {
        width: 100% !important;
        max-width: 720px !important;
        }
        body .c-v84rpm .c-7bgiy1 .c-1c86scm {
        display: none !important;
        }
        body .c-v84rpm .c-7bgiy1 .c-f1bud4 .c-pekv9n .c-1qv5bbj,
        body .c-v84rpm .c-7bgiy1 .c-f1bud4 .c-1c9o9ex .c-1qv5bbj,
        body .c-v84rpm .c-7bgiy1 .c-f1bud4 .c-90qmnj .c-1qv5bbj {
        border-width: 1px 0 0 !important;
        }
        body .c-v84rpm .c-7bgiy1 .c-f1bud4 .c-183lp8j .c-1qv5bbj {
        border-width: 1px 0 !important;
        }
        body .c-v84rpm .c-7bgiy1 .c-f1bud4 .c-pekv9n .c-1qv5bbj {
        padding-left: 12px !important;
        padding-right: 12px !important;
        }
        body .c-v84rpm .c-7bgiy1 .c-f1bud4 .c-1c9o9ex .c-1qv5bbj,
        body .c-v84rpm .c-7bgiy1 .c-f1bud4 .c-90qmnj .c-1qv5bbj {
        padding-left: 8px !important;
        padding-right: 8px !important;
        }
        body .c-v84rpm .c-ry4gth .c-1dhsbqv {
        display: none !important;
        }
    }
    @media screen and (max-width: 720px) {
        body .c-v84rpm .c-ry4gth .c-1vld4cz {
        padding-bottom: 10px !important;
        }
    }
    </style>
    <title>${newData.subject}</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: &quot; HelveticaNeueLight&quot;,&quot;HelveticaNeue-Light&quot;,&quot;HelveticaNeueLight&quot;,&quot;HelveticaNeue&quot;,&quot;HelveticaNeue&quot;,Helvetica,Arial,&quot;LucidaGrande&quot;,sans-serif;font-weight: 300; font-stretch: normal; font-size: 14px; letter-spacing: .35px; background: #576a3d; color: #333333;">
    <table border="1" cellpadding="0" cellspacing="0" align="center" class="c-v84rpm" style="border: 0 none; border-collapse: separate; width: 720px;" width="720">
    <tbody>
        <tr class="c-1syf3pb" style="border: 0 none; border-collapse: separate; height: 114px;">
        <td style="border: 0 none; border-collapse: separate; vertical-align: middle;" valign="middle">
            <table align="center" border="1" cellpadding="0" cellspacing="0" class="c-f1bud4" style="border: 0 none; border-collapse: separate;">
            <tbody>
                <tr align="center" class="c-1p7a68j" style="border: 0 none; border-collapse: separate; padding: 16px 0 15px;">
                <td style="border: 0 none; border-collapse: separate; vertical-align: middle;" valign="middle"><img alt="" src="https://res.cloudinary.com/unitix/image/upload/v1651760953/black_aznemj.png" class="c-1shuxio" style="border: 0 none; line-height: 100%; outline: none; text-decoration: none; height: 120px; width: 120px;" width="120" height="12 0"></td>
                </tr>
            </tbody>
            </table>
        </td>
        </tr>
        <tr class="c-7bgiy1" style="border: 0 none; border-collapse: separate; -webkit-box-shadow: 0 3px 5px rgba(0,0,0,0.04); -moz-box-shadow: 0 3px 5px rgba(0,0,0,0.04); box-shadow: 0 3px 5px rgba(0,0,0,0.04);">
        <td style="border: 0 none; border-collapse: separate; vertical-align: middle;" valign="middle">
            <table align="center" border="1" cellpadding="0" cellspacing="0" class="c-f1bud4" style="border: 0 none; border-collapse: separate; width: 100%;" width="100%">
            <tbody>
                <tr class="c-pekv9n" style="border: 0 none; border-collapse: separate; text-align: center;" align="center">
                <td style="border: 0 none; border-collapse: separate; vertical-align: middle;" valign="middle">
                    <table border="1" cellpadding="0" cellspacing="0" width="100%" class="c-1qv5bbj" style="border: 0 none; border-collapse: separate; border-color: #E3E3E3; border-style: solid; width: 100%; border-width: 1px 1px 0; background: #FBFCFC; padding: 40px 54px 42px;">
                    <tbody>
                        <tr style="border: 0 none; border-collapse: separate;">
                        <td class="c-1m9emfx c-zjwfhk" style="border: 0 none; border-collapse: separate; font-family: &quot; HelveticaNeueLight&quot;,&quot;HelveticaNeue-Light&quot;,&quot;HelveticaNeueLight&quot;,&quot;HelveticaNeue&quot;,&quot;HelveticaNeue&quot;,Helvetica,Arial,&quot;LucidaGrande&quot;,sans-serif;font-weight: 300; color: #1D2531; font-size: 13.63636px;"
                            valign="middle">Hi ${newData.name}.</td>
                        </tr>
                        <tr style="border: 0 none; border-collapse: separate;">
                        <td class="c-eitm3s c-16v5f34" style="border: 0 none; border-collapse: separate; font-family: &quot; HelveticaNeueMedium&quot;,&quot;HelveticaNeue-Medium&quot;,&quot;HelveticaNeueMedium&quot;,&quot;HelveticaNeue&quot;,&quot;HelveticaNeue&quot;,sans-serif;font-weight: 500; font-size: 14.63636px; padding-top: 12px;"
                         >${newData.body}</td>
                        </tr>
                       ${
                         newData.calendyLink && (
                           <tr style="border: 0 none; border-collapse: separate;">
                             <td
                               class="c-rdekwa"
                               style="border: 0 none; border-collapse: separate; vertical-align: middle; padding-top: 38px;"
                               valign="middle"
                             >
                               <a
                                 href="${newData.calendyLink}"
                                 target="_blank"
                                 class="c-1eb43lc c-1sypu9p c-16v5f34"
                                 style='color: #000000; -webkit-border-radius: 4px; font-family: " HelveticaNeueMedium","HelveticaNeue-Medium","HelveticaNeueMedium","HelveticaNeue","HelveticaNeue",sans-serif;font-weight: 500; font-size: 13.63636px; line-height: 15px; display: inline-block; letter-spacing: .7px; text-decoration: none; -moz-border-radius: 4px; -ms-border-radius: 4px; -o-border-radius: 4px; border-radius: 4px; background-color: #F7B919; background-image: url("https://mail.crisp.chat/images/linear-gradient(-1deg,#137ECE2%,#288BD598%)" );color: #FFFFFF; padding: 12px 24px;'
                               >
                                 Book a date
                               </a>
                             </td>
                           </tr>
                         )
                       } 
                        <tr style="border: 0 none; border-collapse: separate;">
                        <td class="c-46vhq4 c-4w6eli" style="border: 0 none; border-collapse: separate; vertical-align: middle; font-family: &quot; HelveticaNeue&quot;,&quot;HelveticaNeue&quot;,&quot;HelveticaNeueRoman&quot;,&quot;HelveticaNeue-Roman&quot;,&quot;HelveticaNeueRoman&quot;,&quot;HelveticaNeue-Regular&quot;,&quot;HelveticaNeueRegular&quot;,Helvetica,Arial,&quot;LucidaGrande&quot;,sans-serif;font-weight: 400; color: #7F8FA4; font-size: 15.45455px; padding-top: 20px;"
                        valign="middle">Preferred Screening Date: ${
                          newData.date || ''
                        }</td>
                    </tr>
                        <tr style="border: 0 none; border-collapse: separate;">
                        <td class="c-ryskht c-zjwfhk" style="border: 0 none; border-collapse: separate; vertical-align: middle; font-family: &quot; HelveticaNeueLight&quot;,&quot;HelveticaNeue-Light&quot;,&quot;HelveticaNeueLight&quot;,&quot;HelveticaNeue&quot;,&quot;HelveticaNeue&quot;,Helvetica,Arial,&quot;LucidaGrande&quot;,sans-serif;font-weight: 300; font-size: 12.72727px; font-style: italic; padding-top: 52px;"
                            valign="middle">Loop Not Luck.</td>
                        </tr>
                    </tbody>
                    </table>
                </td>
                </tr>
                </tbody>
                </table>
                </body>`),
    await mailTransport.sendMail(mailOptions);
  functions.logger.log(
    'Application Review Process email sent to:',
    newData.email
  );
  return null;
}
