const Poll = require("../models/Poll")
const mongoose = require("mongoose")
const TotalVotes = require("../models/TotalVotes")
const Account = require("../models/Account")
require("dotenv").config({ path: "../config/.env" })

// const deletePolls = async () => {
//   await mongoose.connect(process.env.MONGO_URI)
//   await Poll.deleteMany()
//   await mongoose.disconnect()
// }

// deletePolls()

// const initPolls = async () => {
//   await mongoose.connect(process.env.MONGO_URI)
//   await Poll.create({})
//   await mongoose.disconnect()
// }

// initPolls()

// const deleteTotalVotes = async () => {
//   await mongoose.connect(process.env.MONGO_URI)
//   await TotalVotes.deleteMany()
//   await mongoose.disconnect()
// }

// deleteTotalVotes()

// const initTotalVotes = async () => {
//   await mongoose.connect(process.env.MONGO_URI)
//   await TotalVotes.create({})
//   await mongoose.disconnect()
// }

// initTotalVotes()

// const deleteAccounts = async () => {
//   await mongoose.connect(process.env.MONGO_URI)
//   await Account.deleteMany()
//   await mongoose.disconnect()
// }

// deleteAccounts()