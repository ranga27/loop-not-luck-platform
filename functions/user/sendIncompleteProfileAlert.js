const functions = require('firebase-functions/v1');
const admin = require('firebase-admin');
admin.initializeApp();

exports.sendIncompleteProfileAlert = functions.pubsub
    .schedule('every 1 weeks')
    .onRun(async (context) => {
        const incompleteUsers = await admin
            .firestore()
            .collection('users')
            .where('hasCompletedProfile', '==', false)
            .get();

        const mailPromises = incompleteUsers.docs.map(async (doc) => {
            const user = doc.data();
            const { email } = userData;

            // Send a reminder email to the user
            const mailOptions = {
                from: 'Loop Not Luck hello@loopnotluck.com',
                to: email,
                subject: '[Loop Not Luck] Incomplete Profile',
                html: `Hey there,<br><br>
                    Thank you for taking the time to sign up to our new and improved portal! I can see that your profile is marked incomplete. Please be sure to upload your CV and fill in all the required details so we can start matching you with exciting opportunities - <a href="https://loop-luck.web.app/app">https://loop-luck.web.app/app</a>.<br><br>
                    If you no longer wish to receive emails from Loop Not Luck, you can unsubscribe <a href="https://loop-luck.web.app/unsubscribe/${email}">here</a>.<br><br>
                    Kind regards,<br>
                    The Loop Not Luck team`,
            };

            try {
                await admin.firestore().collection('mail').add(mailOptions);
                console.log(`Reminder email sent to ${email}`);
            } catch (error) {
                console.error(`Error sending reminder email to ${email}: ${error}`);
            }
        });

        return Promise.all(mailPromises);

    });    