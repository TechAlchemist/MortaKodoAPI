const nodemailer = require('nodemailer');

const sendMail = (email, uniqueString) => {
    const transport = nodemailer.createTransport({
        service: 'outlook',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASS
        }
    });

    const sender = process.env.SENDER;
    const mailOptions = {
        from: sender,
        to: email,
        subject: 'Morta Kodo: Email Confirmation',
        html: `Press <a href=http://localhost:8080/api/v1/auth/verify/${uniqueString}> here </a> to verify your email. `
    };

    transport.sendMail(mailOptions, (error, response) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Message sent. \n' + JSON.stringify(response));
        }
    });

}

module.exports = {
    sendMail
}