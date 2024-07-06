var express = require("express");
var axios = require("axios");
const Email = require("../models/Email");
var router = express.Router();
router.post("/insert-url-scraped-emails", async (req, res) => {
  try {
    const { communityTypeID, url } = req.body;

    const response = await axios(url);
    const html_data = response.data;
    // ^ => start, $ => end , \w => words , + => one or more, [\w-]{2,4} => match sequence of 2 to 4 consecutive characters or hypens e.g=> .com/.net
    const emailPattern = /[\w-\.]+@([\w-]+\.)+[\w-]{2,4}/g;
    // match into set so that we make sure there are no email duplicates =>
    const emailAddresses = new Set(html_data.match(emailPattern) || []);
    // add attributes to email object before creating
    const emailObjects = [
      ...Array.from(emailAddresses),
      "nez.hadeel@gmail.com",
    ].map((email) => ({
      email,
      communityTypeID,
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
  } catch (e) {
    res.status(500).send({ error: `${e} : "Failed to insert records` });
  }
});

module.exports = router;
