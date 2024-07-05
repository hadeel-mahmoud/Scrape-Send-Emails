// app.use(express.static("public"));
var express = require("express");
var app = express();
const cors = require("cors");
const mongoose = require("mongoose");
var communities = require("./src/routes/communities.js");
var bodyParser = require("body-parser");
var app = express();
const sendEmail = require("./src/utils/sendEmail.js");
// parse application/json
app.use(bodyParser.json());
app.use(
  cors(
    { origin: "http://localhost:3000" } // Allow only this origin
  )
);

app.use("/communities", communities);

app.post("/api/test-email", async (req, res) => {
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

app.listen(5000, function () {
  console.log("Express App running at http://127.0.0.1:5000/");
});

mongoose
  .connect("mongodb://localhost:27017/scrapeAndSendEmailsDB")
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.log(err));
