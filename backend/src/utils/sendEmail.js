const sendgrid = require("@sendgrid/mail");
require("dotenv").config();
sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = ({ to, from, subject, text, html, personalizations }) => {
  const msg = { to, from, subject, text, html, personalizations };
  return sendgrid.send(msg);
};

module.exports = sendEmail;
