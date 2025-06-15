// node mailer data
const dotenv = require("dotenv");
dotenv.config();

const sendInBlueMailId = process.env.SendInBlueMailId;

const sendInBlueMailPass = process.env.SendInBlueMailPass;

const BaseUrl = process.env.BASE_URL;

const PORT = process.env.PORT;

module.exports = {
  sendInBlueMailId,
  sendInBlueMailPass,
  BaseUrl,
  PORT,
};
