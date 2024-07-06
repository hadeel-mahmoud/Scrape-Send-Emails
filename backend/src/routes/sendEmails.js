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
    let emailBody = `<strong>Hi!<br/><br/>
    We hope you are doing well. This is a testing email</strong>
    <br><br>  
    Best Regards HM
    <br/><br/><br/>
    <a href="https://localhost:3000/unsubscribeFromEmails/6689a46f9b51e9cd995e77e0">Unsubscribe</a>`;

    // this regex takes all content between curly braces
    const regex = /{[^{}|]*\|[^{}|]*}/g;
    // spintax variations
    const replacedEmailContent = emailBody.replace(regex, (match) => {
      const options = match.substring(1, match.length - 1).split("|"); // Substring input values are for removing outer {}
      const randomIndex = Math.floor(Math.random() * options.length);
      return options[randomIndex];
    });

    await sendEmail({
      //the client email
      to: ["nez.hadeel@gmail.com", "hadeel.nez99@gmail.com"],
      //sendGrid sender id
      from: "nez.hadeel@gmail.com",
      subject: "Does this work?",
      text: "Hello!",
      html: replacedEmailContent,
    });
    res.sendStatus(200);
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
