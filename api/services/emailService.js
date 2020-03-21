const Sendgrid = require("sendgrid-web");
const dotenv = require('dotenv');

dotenv.config();

let sendgrid = new Sendgrid({
    user: process.env.USER_SENDGRID,
    key: process.env.PASSWORD_SENDGRID
  });

  module.exports = sendgrid;