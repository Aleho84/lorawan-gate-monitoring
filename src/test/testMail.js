import sendEmail from '../utils/mailer.js';

const mailData = {
    from: process.env.MAIL_FROM,
    to: process.env.MAIL_TO,
    subject: 'test',
    html: '<p> test </p>'
}

sendEmail(mailData)
    .then(info => {
        console.log('Message sent successfully');
    });