var express = require("express");
var router = express.Router();
var sendEmail = require("../utils/sendEmail.js");
var Email = require("../models/Email.js");
const {
  queryTopSubscribedEmails,
  queryByEmails,
} = require("../services/emailServices.js");
require("dotenv").config();

const sendGridEmail = process.env.SENDGRID_EMAIL;
// router.post("/create-email", async (req, res) => {
//   try {
//     const newEmailAddress = new Email(req.body);
//     const email = await newEmailAddress.save();
//     res.json(email);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });

router.post("/send-emails", async (req, res) => {
  try {
    let { emailBody, communityTypeID } = req.body;
    const recipients = await queryTopSubscribedEmails(3, communityTypeID);
    // const recipients = await queryByEmails([
    //   "nez.hadeel@gmail.com",

    // ]);

    // this regex takes all content between curly braces
    const regex = /{[^{}|]*\|[^{}|]*}/g;
    // spintax variations
    const replacedEmailContent = emailBody.replace(regex, (match) => {
      const options = match.substring(1, match.length - 1).split("|"); // Substring input values are for removing outer {}
      const randomIndex = Math.floor(Math.random() * options.length);
      return options[randomIndex];
    });

    const fullEmailTemplate = replacedEmailContent.concat(
      `<a href="http://localhost:3000/unsubscribeFromEmails/{{email_id}}">Unsubscribe</a>`
    );
    const msg = {
      from: sendGridEmail,
      subject: "Does this work?",
      personalizations: [],
      content: [
        {
          type: "text/plain",
          value: fullEmailTemplate,
        },
        {
          type: "text/html",
          value: fullEmailTemplate,
        },
      ],
    };
    recipients.forEach((recipient) => {
      let id = recipient.id;
      msg.personalizations.push({
        to: { email: recipient.email },
        substitutionWrappers: ["{{", "}}"],
        substitutions: {
          email_id: id,
        },
      });
    });

    try {
      const result = await sendEmail(msg);
      res.status(200).json({ status: "success", result });
    } catch (error) {
      res.status(500).json({ error: "Failed to send emails" });
    }
  } catch (error) {
    res.status(500).send({ error: error });
  }
});

router.put("/update-subscription-status", async (req, res) => {
  const { id } = req.body;
  const updatedSubscription = { subscribed: false };
  console.log(id);
  try {
    const updateRecord = await Email.findByIdAndUpdate(
      id,
      { $set: updatedSubscription },
      { new: true, runValidators: true }
    );

    if (!updateRecord) {
      return res.status(404).send({ error: "Record not found" });
    }

    res.status(200).send(updateRecord);
  } catch (error) {
    res.status(500).send({ error: error });
  }
});
module.exports = router;
