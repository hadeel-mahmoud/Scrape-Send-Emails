const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const communities = require("./src/routes/communities.js");
const bodyParser = require("body-parser");
const sendEmails = require("./src/routes/sendEmails.js");
const scrapeEmails = require("./src/routes/scrapeEmails.js");

// const scrapeEmails = require("./src/utils/scrapeEmails.js");

// parse application/json
app.use(bodyParser.json());
app.use(
  cors(
    { origin: "http://localhost:3000" } // Allow only this origin
  )
);
app.use("/communities", communities);
app.use("/sendEmails", sendEmails);
app.use("/scrapeEmails", scrapeEmails);

// app.use("/scrapeEmails", scrapeEmails);

app.listen(5000, function () {
  console.log("Express App running at http://127.0.0.1:5000/");
});

mongoose
  .connect("mongodb://localhost:27017/scrapeAndSendEmailsDB")
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.log(err));
