import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    //use an email provider like mailgun, mailjet or sendgrid
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {//change this to remove password in text
        user: 'ranga27383@gmail.com',
        pass: 'Envy2020',
    }
});

//Utility function to send email
export const sendEmail = ({ to, from, subject, message }) => {
    const mailOptions = {
        to,
        from,
        subject,
        text: message,
    };

    return transporter.sendMail(mailOptions);
}