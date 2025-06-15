const nodemailer = require("nodemailer");
const {
  sendInBlueMailId,
  sendInBlueMailPass,
} = require("../../constant/constants");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail", // or use "smtp.mailtrap.io" or custom SMTP
  auth: {
    user: sendInBlueMailId,
    pass: sendInBlueMailPass,
  },
});

const sendMail = async ({ to, subject, html }) => {
  console.log(
    "SendInBlue Mail ID:",
    sendInBlueMailId,
    "SendInBlue Mail Pass:",
    sendInBlueMailPass
  );
  try {
    const mailOptions = {
      from: sendInBlueMailId,
      to,
      subject,
      html,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

module.exports = {
  transporter,
  sendMail,
};
