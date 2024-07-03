const mongoose = require("mongoose");
var CommunitySchema = mongoose.Schema({
  category: { type: String, required: true, trim: true },
  urls: {
    type: [String],
    required: [true, "URL is required"],
    // this is marked default because otherwise required will not work
    default: undefined,
  },
});
module.exports = mongoose.model("Community", CommunitySchema, "Communities");
