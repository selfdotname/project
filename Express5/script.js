const express = require("express")
const mongoose = require("mongoose")
const Credential = require("./models/credential")

const app = express()
const PORT = process.env.PORT || 65_535
const dbURI = "mongodb+srv://obaro:mypassword@cluster0.8lgns.mongodb.net/trppicer?retryWrites=true&w=majority&appName=Cluster0"

mongoose.connect(dbURI)
    .then(async data => {
        console.log("connected to db")

        const credential = new Credential({
            username: "admin",
            password: "trippicer"
        })

        try {
            await credential.save()

            console.log("data saved")

            process.exit(0)
        } catch (err) {
            console.log("error adding data")

            process.exit(1)
        }
    })
    .catch(err => {
        console.log("something went wrong")
    })