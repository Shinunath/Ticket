const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true, minlength: 2 },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        mobileNumber: { type: Number, required: true },
        address: String,
        interest: String,
        isVerified: { type: Boolean, default: false },
    },
    { timestamps: true }
);

module.exports = mongoose.model("users", userSchema);
