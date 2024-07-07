var express = require("express");
var axios = require("axios");
const Email = require("../models/Email");
const scrapeEmails = require("../utils/scrapeEmail");
const { queryTopSubscribedEmails } = require("../services/emailServices");
var router = express.Router();

router.post("/insert-url-scraped-emails", async (req, res) => {
  try {
    const top50 = await queryTopSubscribedEmails(3);

    const { communityTypeID, url } = req.body;
    const response = await axios(url);
    const scrapedEmails = scrapeEmails(response.data, communityTypeID);

    const bulkOperations = scrapedEmails.map((emailObject) => ({
      updateOne: {
        filter: { email: emailObject.email },
        update: { $setOnInsert: emailObject },
        upsert: true,
      },
    }));
    const result = await Email.bulkWrite(bulkOperations);
    // upserted amount is the # of newly created items
    if (result.upsertedCount > 0) {
      res.status(201).send({
        message: `${result.upsertedCount} Emails have been successfuly scraped and saved into the database`,
      });
    } else {
      res.status(201).send({ message: "All emails in URL already exist" });
    }
  } catch (e) {
    res.status(500).send({ error: `${e} : "Failed to insert records` });
  }
});

module.exports = router;
