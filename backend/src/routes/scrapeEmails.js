var express = require("express");
var axios = require("axios");
const Email = require("../models/Email");
var router = express.Router();
router.post("/scrape-url", async (req, res) => {
  try {
    await axios(
      "https://raw.githubusercontent.com/ageitgey/all-podcasts-dataset/master/a.tsv"
    ).then(async (response) => {
      const html_data = response.data;

      // ^ => start, $ => end , \w => words , + => one or more, [\w-]{2,4} => match sequence of 2 to 4 consecutive characters or hypens e g=> .com/.net
      const emailPattern = /[\w-\.]+@([\w-]+\.)+[\w-]{2,4}/g;
      // match into set so that we make sure there are no email duplicates =>
      const emailAddresses = new Set(html_data.match(emailPattern) || []);
      // add attributes to email object before creating
      const emailObjects = Array.from(emailAddresses).map((email) => ({
        email: email,
        communityTypeID: req.body.communityTypeID,
      }));

      const bulkOperations = emailObjects.map((emailObject) => ({
        updateOne: {
          filter: { email: emailObject.email },
          update: { $setOnInsert: emailObject },
          upsert: true,
        },
      }));
      await Email.bulkWrite(bulkOperations);
      res.status(201).send({ message: "Records inserted successfully" });
    });
  } catch (e) {
    console.log("fail");
    console.log(e);
    res.sendStatus(500);
  }
});

module.exports = router;
