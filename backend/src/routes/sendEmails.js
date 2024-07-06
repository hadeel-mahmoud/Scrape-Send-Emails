var express = require("express");
var router = express.Router();
var sendEmail = require("../utils/sendEmail.js");
var Email = require("../models/Email.js");
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
    let recipients = [
      {
        _id: "6689a46f9b51e9cd995e77e0",
        email: "nez.hadeel@gmail.com",
        communityTypeID: "66859fe62896840849a81597",
        subscribed: false,
      },
      {
        _id: "6689b1cb9b51e9cd995e8098",
        email: "hadeel.nez99@gmail.com",
        communityTypeID: "66859fe62896840849a81597",
        subscribed: false,
      },
    ];
    let emailBody = `<strong>Hi!<br/><br/>
    We hope you are doing well. This is a testing email</strong>
    <br><br>  
    Best Regards HM
    <br/><br/><br/>`;

    // this regex takes all content between curly braces
    const regex = /{[^{}|]*\|[^{}|]*}/g;
    // spintax variations
    const replacedEmailContent = emailBody.replace(regex, (match) => {
      const options = match.substring(1, match.length - 1).split("|"); // Substring input values are for removing outer {}
      const randomIndex = Math.floor(Math.random() * options.length);
      return options[randomIndex];
    });

    const msg = {
      from: "nez.hadeel@gmail.com",
      subject: "Does this work?",
      text: "Hello!",
      personalizations: [],
    };

    recipients.forEach((recipient) => {
      msg.personalizations.push({
        to: [{ email: recipient.email }],
        html: replacedEmailContent.concat(
          `<a href="https://localhost:3000/unsubscribeFromEmails/6689a46f9b51e9cd995e77e0">Unsubscribe</a>`
        ),
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
