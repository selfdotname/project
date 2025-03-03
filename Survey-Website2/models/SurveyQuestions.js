const mongoose = require("mongoose")

const Schema = mongoose.Schema

const surveyQuestionsSchema = new Schema({
  question: String,
  options: [String],
})

module.exports = mongoose.model("surveyquestions", surveyQuestionsSchema)