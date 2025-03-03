const expTime = require("../config/expirationTime")
const mongoose = require("mongoose")

const Schema = mongoose.Schema

const otpVerificationSchema = new Schema({
  email: { type: String, required: true },
  otp: { type: String, reqired: true },
  status: {type: String, enum: ["not-otped", "otped", "verified"], default: "not-otped"},
  expiresAt: { type: Date, default: () => new Date(Date.now() + expTime) }
})

module.exports = mongoose.model("otpverifications", otpVerificationSchema)