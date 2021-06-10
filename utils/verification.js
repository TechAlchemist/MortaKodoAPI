const nodemailer = require('nodemailer');

const sendMail = (email, uniqueString) => {
    console.log('send mail process has begun')
    const transport = nodemailer.createTransport({
        service: 'outlook',
        auth: {
            user: 'brandonRmyers1714@outlook.com',
            pass: 'Myers2019!'
        }
    });

    const sender = process.env.SENDER;
    const mailOptions = {
        from: sender,
        to: email,
        subject: 'Morta Kodo: Email Confirmation',
        html: `Press <a href=http://localhost:8080/verify/${uniqueString}> here </a> to verify your email. `
    };

    transport.sendMail(mailOptions, (error, response) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Message sent. \n' + response);
        }
    });

}

module.exports = {
    sendMail
}