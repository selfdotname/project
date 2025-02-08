const express = require("express")
const mongoose = require("mongoose")
const Employee = require("./models/employee")
const Credential = require("./models/credential")

const app = express()
const PORT = process.env.PORT || 65_535
const dbURI = "mongodb+srv://obaro:mypassword@cluster0.8lgns.mongodb.net/trppicer?retryWrites=true&w=majority&appName=Cluster0"

mongoose.connect(dbURI)
    .then(data => {
        console.log("connected to db")

        app.listen(PORT, () => {
            console.log("server listening on port " + PORT)
        })
    })
    .catch(err => {
        console.log("couldnt connect to db")
    })


app.set("view engine", "ejs")

app.use("/employee", express.static("public"))
app.use(express.static("public"))
app.use(express.urlencoded({ extended: true }))

// path /
app.get("/", (req, res) => {
    res.render("index", { message: null, status: null })
})
app.post("/", (req, res) => {
    Credential.find(req.body)
        .then(result => {
            if (result.length == 1) {
                // logged in
                res.render("index", { message: null, status: "loggedin" })
            } else {
                // invalid credentials
                res.render("index", { message: "Incorrect username or password", status: null })
            }
        })
        .catch(err => {
            console.log("error searching database")
        })
})

// path /employee
app.get("/employees", (req, res) => {
    Employee.find().sort({ createdAt: -1 })
        .then(result => {
            if (result.length > 0) {
                res.render("employees", { result })
            } else {
                res.render("employees", { result: null })
            }
        })
})

// path /employee/add
app.get("/employee/add", (req, res) => {
    res.render("add", { message: null })
})

app.post("/employee/add", (req, res) => {
    const employee = new Employee({
        name: req.body.name,
        position: req.body.position,
        salary: parseInt(req.body.salary)
    })

    employee.save()
        .then(result => {
            res.render("add", { message: "Employee added successfully" })
        })
        .catch(err => {
            res.render("add", { message: "Something went wrong" })
            console.log(err)
        })
})

// path /employee/delete
app.delete("/employee/delete/:id", (req, res) => {
    console.log(req.params.id + " deleted")

    Employee.findByIdAndDelete(req.params.id)
        .then(result => {
            res.send("/employees")
        })
})