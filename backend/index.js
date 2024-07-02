var express = require("express");
var app = express();
const cors = require("cors");

// app.use(express.static("public"));
var things = require("./src/routes/things.js");
app.use(
  cors(
    { origin: "http://localhost:3000" } // Allow only this origin
  )
);
app.use("/things", things);

app.listen(5000, function () {
  console.log("Express App running at http://127.0.0.1:5000/");
});
