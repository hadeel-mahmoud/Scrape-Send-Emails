// app.use(express.static("public"));
var express = require("express");
var app = express();
const cors = require("cors");
const mongoose = require("mongoose");
var communities = require("./src/routes/communities.js");
var bodyParser = require("body-parser");
var app = express();

// parse application/json
app.use(bodyParser.json());
app.use(
  cors(
    { origin: "http://localhost:3000" } // Allow only this origin
  )
);

app.use("/communities", communities);

app.listen(5000, function () {
  console.log("Express App running at http://127.0.0.1:5000/");
});

mongoose
  .connect("mongodb://localhost:27017/scrapeAndSendEmailsDB")
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.log(err));
