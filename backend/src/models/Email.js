const mongoose = require("mongoose");
var EmailSchema = mongoose.Schema({
  email: { type: String, required: true, trim: true, unique: true },
  // creating one to many relationship between email - community
  communityTypeID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Community",
    required: true,
  },
  subscribed: { type: Boolean, default: true },
});
module.exports = mongoose.model("Email", EmailSchema, "Emails");
