var express = require("express");
var router = express.Router();
var Community = require("../models/Community");

// router.get("/", function (req, res) {
//   res.send(JSON.stringify("GET route on things."));
// });
// router.post("/", function (req, res) {
//   res.send("POST route on things.");
// });

router.get("/", async (req, res) => {
  try {
    const communities = await Community.find();
    res.json(communities);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

router.post("/", async (req, res) => {
  try {
    console.log(req.body);
    const newCommmunity = new Community(req.body);
    const community = await newCommmunity.save();
    res.json(community);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error" + err.toString());
  }
});

module.exports = router;
