const mongoose = require("mongoose")

const Schema = mongoose.Schema

const accountSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ["not-proven", "proven", "surveyed", "blocked"],
    required: true
  }
}, { timestamps: true })

module.exports = mongoose.model("accounts", accountSchema)