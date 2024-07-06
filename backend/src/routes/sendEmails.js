var express = require("express");
var router = express.Router();
var sendEmail = require("../utils/sendEmail.js");
var Email = require("../models/Email.js");

router.post("/create-email", async (req, res) => {
  try {
    const newEmail = new Email(req.body);
    const email = await newEmail.save();
    res.json(email);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/test-email", async (req, res) => {
  try {
    await sendEmail({
      //the client email
      to: "nez.hadeel@gmail.com",
      //sendGrid sender id
      from: "nez.hadeel@gmail.com",
      subject: "Does this work?",
      text: "Glad you are here .. yes you!",
      html: "<strong>It is working!!</strong>",
    });
    console.log(res, "success");
    res.sendStatus(200);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

module.exports = router;
