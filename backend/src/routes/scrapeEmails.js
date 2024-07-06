var express = require("express");
var axios = require("axios");

var router = express.Router();
router.post("/scrape-url", async (req, res) => {
  try {
    await axios(
      "https://raw.githubusercontent.com/ageitgey/all-podcasts-dataset/master/a.tsv"
    ).then((response) => {
      const html_data = response.data;
      // match into set so that we make sure there are no email duplicates =>

      const emailPattern = /[\w-\.]+@([\w-]+\.)+[\w-]{2,4}/g;
      // ^ => start, $ => end , \w => words , + => one or more, [\w-]{2,4} => match sequence of 2 to 4 consecutive characters or hypens e g=> .com/.net
      // const emailPattern = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
      const emailAddresses = new Set(html_data.match(emailPattern) || []);
      res.json(Array.from(emailAddresses));
    });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

module.exports = router;
