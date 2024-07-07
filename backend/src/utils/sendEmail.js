const sendgrid = require("@sendgrid/mail");
require("dotenv").config();
sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = ({ to, from, subject, content, personalizations }) => {
  const msg = { to, from, subject, content, personalizations };
  console.log(msg);
  return sendgrid.send(msg);
};

module.exports = sendEmail;
