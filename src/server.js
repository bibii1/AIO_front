const nodemailer = require('nodemailer');
require('dotenv').config();
// eslint-disable-next-line no-unused-vars
function emailSend(mail){
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      //user: "confirmation.aio@gmail.com",
      //pass: "bb|T-NJ`Se5o3]SB"
      user: process.env.EMAIL,
      pass: process.env.PASSWORD
    }
  });
  let mailOptions = {
    from: "confirmation.aio@gmail.com",
    to: mail,
    subject: "Confirm AIO Account",
    text: "Click on this link :"
  };
  transporter.sendMail(mailOptions, function (err) {
    if (err) {
      console.log("Error occurs", err);
    } else {
      console.log("Email send");
    }
  });
}