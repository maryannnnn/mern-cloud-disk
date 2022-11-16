const nodemailer = require('nodemailer');

exports.sendActivationMail = async (to, link) => {

let transport = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD
  },
  debug: true,
  logger: true
});

let scrapeEmailMessage = {
  from: process.env.SMTP_USER,
  to,
  subject: 'Активация аккаунта на ' + process.env.API_URL,
  text: '',
  html: `
                    <div>
                        <h1>Для активации перейдите по ссылке</h1>
                        <a href="${link}">${link}</a>
                    </div>
                `
}

await transport.sendMail(scrapeEmailMessage, function (err, data) {
  if (err) {
    console.log(err);
  } else {
    console.log('Email sent successfully');
  }
});

}