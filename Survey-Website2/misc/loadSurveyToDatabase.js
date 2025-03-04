const surveyQuestions = require("./surveys.json")
const mongoose = require("mongoose")
require("dotenv").config({ path: "../config/.env" })
const SurveyQuestionsModel = require("../models/SurveyQuestions")

const loadSurveys = async () => {
  await mongoose.connect(process.env.MONGO_URI)
  for (var surveyQuestion of surveyQuestions) {
    await SurveyQuestionsModel.create({
      question: surveyQuestion.question,
      options: surveyQuestion.options
    })
  }
  await mongoose.disconnect()
}

loadSurveys()



// const deleteSurvey = async () => {
//   await mongoose.connect(process.env.MONGO_URI)
//   await SurveyQuestionsModel.deleteMany()
//   await mongoose.disconnect()
// }

// deleteSurvey()

