const express = require("express")
const mongoose = require("mongoose")
const Credential = require("./models/credential")
const Employee = require("./models/employee")
const fs = require("fs")

const app = express()
const PORT = process.env.PORT || 65_535
const dbURI = "mongodb+srv://obaro:mypassword@cluster0.8lgns.mongodb.net/trppicer?retryWrites=true&w=majority&appName=Cluster0"

mongoose.connect(dbURI)
    .then(async data => {
        console.log("connected to db")

        var employees = fs.readFileSync("employee.json", "utf8")
        employees = JSON.parse(employees)

        for (const employee of employees) {
            const employeeEntry = new Employee({
                name: employee.name,
                position: employee.position,
                salary: employee.salary
            })

            try {
                await employeeEntry.save()
                console.log("data saved")
            } catch (err) {
                console.log("couldnt save data")
                process.exit(1)
            }
        }

        process.exit(0)
    })
    .catch(err => {
        console.log("something went wrong")
    })