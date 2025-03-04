const proofQuestions = require("./proofQuestions.json")
const mongoose = require("mongoose")
require("dotenv").config({ path: "../config/.env" })
const proofQuestionsModel = require("../models/ProofQuestions")

// const loadProofQuestions = async () => {
//   await mongoose.connect(process.env.MONGO_URI)
//   for (var proofQuestion of proofQuestions) {
//     await proofQuestionsModel.create({
//       id: proofQuestion.id,
//       question: proofQuestion.question,
//       options: proofQuestion.options,
//       answer: proofQuestion.answer
//     })
//   }
//   await mongoose.disconnect()
// }

// loadProofQuestions()


// const unloadProofQuestions = async () => {
//   await mongoose.connect(process.env.MONGO_URI)
//   await proofQuestionsModel.deleteMany()
//   await mongoose.disconnect()
// }

// unloadProofQuestions()

const howManyProofQuestions = async () => {
  await mongoose.connect(process.env.MONGO_URI)
  const result = await proofQuestionsModel.find()
  console.log(result.length)
  await mongoose.disconnect()
}

howManyProofQuestions()