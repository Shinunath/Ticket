const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "movieusers",
      required: true,
    },
    otp: {
      type: String,   // ✅ FIXED
      required: true,
    },
    otpExpiry: {
      type: Date,     // ✅ FIXED
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("user_otp", otpSchema);
