const mongoose = require("mongoose")

const Schema = mongoose.Schema

const proofQuestionsSchema = new Schema({
  id:Number,
  question: String,
  options: [String],
  answer: String
})

module.exports = mongoose.model("proofquestions", proofQuestionsSchema)