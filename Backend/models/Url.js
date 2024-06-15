const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  shortUrl: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Url = mongoose.model("Url", urlSchema);

module.exports = Url;
