import nodemailer from 'nodemailer';
import config from '../config/envConfig.js';

const mailSender = async (email, title, body) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: config.EMAIL,
      pass: config.PASSWORD,
    },
  });

  const mailOptions = {
    from: config.EMAIL,
    to: email,
    subject: title,
    html: body,
  };

  // Send the email
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};

export default mailSender;
