const mongoose = require("mongoose")
const Schema = mongoose.Schema

const CredentialSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, {timestamps: true})

const Credential = mongoose.model("Credential", CredentialSchema)
module.exports = Credential