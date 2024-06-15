const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    resetCode: {
      type: String,
      required: false,
      default: null,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    created_at: {
      type: Date,
      default: Date.now(),
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
