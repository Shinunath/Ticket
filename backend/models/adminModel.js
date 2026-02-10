let mongoose = require("mongoose");

let adminSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true, min: 2, },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
}, { timestamps: true })

let adminModel = mongoose.model("admins", adminSchema)
module.exports = adminModel;