const mongoose = require("mongoose")

const totalVotesSchema = new mongoose.Schema({
  totalVotes: {
    type: Number,
    required: true,
    default: 0
  }
})

module.exports = mongoose.model("totalvotes",totalVotesSchema)