const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var EmailSchema = mongoose.Schema({
  email: { type: String, required: true, trim: true, unique: true },
  // creating one to many relationship between email - community
  communityType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Community",
    required: true,
  },
});
module.exports = mongoose.model("Email", EmailSchema, "Emails");
