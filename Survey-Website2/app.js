const express = require("express")
const mongoose = require("mongoose")
require("dotenv").config({ path: "./config/.env" })
const nodemailer = require("nodemailer")
const cookieParser = require("cookie-parser")
const url = require("url")


const OTPModel = require("./models/OTPVerification")
const AccountModel = require("./models/Account")
const ProofQuestionsModel = require("./models/ProofQuestions")
const cleanUpTime = require("./config/cleanupTime")
const SurveyQuestionsModel = require("./models/SurveyQuestions")
const Poll = require("./models/Poll")
const TotalVotes = require("./models/TotalVotes")

const PORT = process.env.PORT || 3000
const app = express()

app.set("view engine", "ejs")

app.use(express.urlencoded({ extended: true }))

app.use(cookieParser())

// -----------------------------------ROUTES

app.get("/", async (req, res) => {
  var referer;
  try { referer = url.parse(req.get("Referer")).pathname } catch (err) { }
  if (referer && referer == "/") {
    return res.render("index", { msg: "Thanks for the feedback/message" })
  }
  res.render("index", { msg: null })
})

app.post("/", async (req, res) => {
  if (!req.body.email || !req.body.message) {
    return res.render("index", { msg: "Email or message cannot be null" })
  }
  sendMail(req.body.email, req.body.message)
  res.redirect("/")
})

app.route("/register")
  .get(async (req, res) => {
    var referer;
    try { referer = url.parse(req.get("Referer")).pathname } catch (err) { }
    if (referer && referer == "/register") {
      return res.render("register", { msg: "Account exists for email" })
    }
    res.render("register", { msg: null })
  })
  .post(async (req, res) => {
    const matches = await AccountModel.find({ email: req.body.email })
    if (!matches.length == 0) {
      return res.redirect("/register")
    }
    const otp = await sendOTP(req.body.email)
    await OTPModel.create({ email: req.body.email, otp })
    res.cookie("email", req.body.email, { httpOnly: true })
    res.redirect("/otp")
  })

app.route("/otp")
  .get(async (req, res) => {
    var referer;
    try { referer = url.parse(req.get("Referer")).pathname } catch (err) { }
    if (referer == "/otp") {
      return res.render("otp", { msg: "Incorrect or expired OTP" })
    }
    res.render("otp", { msg: null })
  })
  .post(async (req, res) => {
    const matches = await OTPModel.find({ email: req.cookies.email, otp: req.body.otp })
    if (matches.length == 1) {
      res.redirect("/password")
    } else {
      res.redirect("/otp")
    }
  })

app.route("/password")
  .get(async (req, res) => {
    var referer;
    try { referer = url.parse(req.get("Referer")).pathname } catch (err) { }
    if (!referer) {
      return res.redirect("/")
    }
    if (referer && referer == "/password") {
      return res.render("password", { msg: "Passwords dont match" })
    }
    res.render("password", { msg: null })
  })
  .post(async (req, res) => {
    if (!req.body.password || !req.body.passwordConfirm || /[^A-Za-z0-9]/.test(req.body.password) || /[^A-Za-z0-9]/.test(req.body.passwordConfirm)) {
      return res.render("password", { msg: "Invalid password" })
    }

    if (req.body.password == req.body.passwordConfirm) {
      await AccountModel.create({ email: req.cookies.email, password: req.body.password, status: "not-proven" })
      res.redirect("/log-in")
    } else {
      res.redirect("/password")
    }
  })

app.route("/log-in")
  .get(async (req, res) => {
    var referer;
    try { referer = url.parse(req.get("Referer")).pathname } catch (err) { }
    if (referer == "/log-in") {
      return res.render("log-in", { msg: "Incorrect Login Credentials" })
    }
    res.render("log-in", { msg: null })
  })
  .post(async (req, res) => {
    const matches = await AccountModel.find({ email: req.body.email, password: req.body.password })
    if (matches.length == 1) {
      res.cookie("email", req.body.email, { httpOnly: true })
      const you = matches[0]
      switch (you.status) {
        case "not-proven":
          res.redirect("/pre-prove")
          break
        case "proven":
          res.redirect("/survey")
          break
        case "surveyed":
          res.redirect("/results")
          break
        case "blocked":
          res.redirect("/blocked")
      }
    } else {
      res.redirect("/log-in")
    }
  })

app.get("/pre-prove", async (req, res) => {
  res.render("pre-prove")
})

app.post("/prove-lobby", async (req, res) => {
  if (req.body.directive == "take test") {
    res.redirect("/test")
  } else {
    res.redirect("/")
  }
})

app.route("/test")
  .get(async (req, res) => {
    const matches = await AccountModel.find({ email: req.cookies.email })
    if (matches.length == 1) {
      switch (matches[0].status) {
        case "blocked":
          return res.redirect("/blocked")
        case "proven":
          return res.render("proveninfo")
        case "surveyed":
          return res.render("surveyedinfo")
        default:
          var proveQuestions = await ProofQuestionsModel.find()
          var reducedQuestions = proveQuestions.sort(() => 0.5 - Math.random()).slice(0, 10);
          return res.render("test", { reducedQuestions })
      }
    }
  })
  .post(async (req, res) => {
    var correct = 0
    var fail = 0
    var proveQuestions = await ProofQuestionsModel.find()
    for (var key in req.body) {
      for (var proofQuestion of proveQuestions) {
        if (key == proofQuestion.question) {
          if (req.body[key] == proofQuestion.answer) {
            correct += 1
          } else {
            fail += 1
          }
        }
      }
    }
    const total = correct + fail
    if (correct > parseInt(total / 2)) {
      await AccountModel.updateOne({ email: req.cookies.email }, { $set: { status: "proven" } })
      res.render("pre-survey")
    } else {
      await AccountModel.updateOne({ email: req.cookies.email }, { $set: { status: "blocked" } })
      res.redirect("/blocked")
    }
  })

app.route("/survey")
  .get(async (req, res) => {
    const matches = await AccountModel.find({ email: req.cookies.email })
    if (matches.length == 1) {
      switch (matches[0].status) {
        case "blocked":
          return res.redirect("/blocked")
        case "not-proven":
          return res.redirect("/pre-prove")
        case "surveyed":
          return res.render("surveyedinfo")
        default:
          const surveyQuestions = await SurveyQuestionsModel.find()
          return res.render("survey", { surveyQuestions })
      }
    }
  })
  .post(async (req, res) => {
    for (var key in req.body) {
      // question 1
      if (req.body[key] == "Front-End") {
        await Poll.updateOne({ [`question1.${req.body[key]}.name`]: req.body[key] }, { $inc: { [`question1.${req.body[key]}.votes`]: 1 } })
      }
      if (req.body[key] == "Back-end") {
        await Poll.updateOne({ [`question1.${req.body[key]}.name`]: req.body[key] }, { $inc: { [`question1.${req.body[key]}.votes`]: 1 } })
      }
      if (req.body[key] == "Full-stack") {
        await Poll.updateOne({ [`question1.${req.body[key]}.name`]: req.body[key] }, { $inc: { [`question1.${req.body[key]}.votes`]: 1 } })
      }

      // question 2
      if (req.body[key] == "JavaScript (Nodejs)") {
        await Poll.updateOne({ [`question2.${req.body[key]}.name`]: req.body[key] }, { $inc: { [`question2.${req.body[key]}.votes`]: 1 } })
      }
      if (req.body[key] == "Python") {
        await Poll.updateOne({ [`question2.${req.body[key]}.name`]: req.body[key] }, { $inc: { [`question2.${req.body[key]}.votes`]: 1 } })
      }
      if (req.body[key] == "PHP") {
        await Poll.updateOne({ [`question2.${req.body[key]}.name`]: req.body[key] }, { $inc: { [`question2.${req.body[key]}.votes`]: 1 } })
      }
      if (req.body[key] == "Java") {
        await Poll.updateOne({ [`question2.${req.body[key]}.name`]: req.body[key] }, { $inc: { [`question2.${req.body[key]}.votes`]: 1 } })
      }
      if (req.body[key] == "Ruby") {
        await Poll.updateOne({ [`question2.${req.body[key]}.name`]: req.body[key] }, { $inc: { [`question2.${req.body[key]}.votes`]: 1 } })
      }
      if (req.body[key] == "C#") {
        await Poll.updateOne({ [`question2.${req.body[key]}.name`]: req.body[key] }, { $inc: { [`question2.${req.body[key]}.votes`]: 1 } })
      }
      if (req.body[key] == "Others") {
        await Poll.updateOne({ [`question2.${req.body[key]}.name`]: req.body[key] }, { $inc: { [`question2.${req.body[key]}.votes`]: 1 } })
      }
      if (req.body[key] == "Not a Back-end or Full-stack Developer") {
        await Poll.updateOne({ [`question2.${req.body[key]}.name`]: req.body[key] }, { $inc: { [`question2.${req.body[key]}.votes`]: 1 } })
      }

      // question 3
      if (req.body[key] == "Web Builders (WordPress, Wix, etc)") {
        await Poll.updateOne({ [`question3.${req.body[key]}.name`]: req.body[key] }, { $inc: { [`question3.${req.body[key]}.votes`]: 1 } })
      }
      if (req.body[key] == "HTML, CSS & JavaScript") {
        await Poll.updateOne({ [`question3.${req.body[key]}.name`]: req.body[key] }, { $inc: { [`question3.${req.body[key]}.votes`]: 1 } })
      }
      if (req.body[key] == "Not a Front-end Developer") {
        await Poll.updateOne({ [`question3.${req.body[key]}.name`]: req.body[key] }, { $inc: { [`question3.${req.body[key]}.votes`]: 1 } })
      }

      // question 4
      if (req.body[key] == "React/Nextjs") {
        await Poll.updateOne({ [`question4.${req.body[key]}.name`]: req.body[key] }, { $inc: { [`question4.${req.body[key]}.votes`]: 1 } })
      }
      if (req.body[key] == "Vue/Nuxtjs") {
        await Poll.updateOne({ [`question4.${req.body[key]}.name`]: req.body[key] }, { $inc: { [`question4.${req.body[key]}.votes`]: 1 } })
      }
      if (req.body[key] == "Angular") {
        await Poll.updateOne({ [`question4.${req.body[key]}.name`]: req.body[key] }, { $inc: { [`question4.${req.body[key]}.votes`]: 1 } })
      }
      if (req.body[key] == "Svelte/SvelteKit") {
        await Poll.updateOne({ [`question4.${req.body[key]}.name`]: req.body[key] }, { $inc: { [`question4.${req.body[key]}.votes`]: 1 } })
      }
      if (req.body[key] == "No frameworks") {
        await Poll.updateOne({ [`question4.${req.body[key]}.name`]: req.body[key] }, { $inc: { [`question4.${req.body[key]}.votes`]: 1 } })
      }
      if (req.body[key] == "Others") {
        await Poll.updateOne({ [`question4.${req.body[key]}.name`]: req.body[key] }, { $inc: { [`question4.${req.body[key]}.votes`]: 1 } })
      }

      // question 5
      if (req.body[key] == "SQL") {
        await Poll.updateOne({ [`question5.${req.body[key]}.name`]: req.body[key] }, { $inc: { [`question5.${req.body[key]}.votes`]: 1 } })
      }
      if (req.body[key] == "NoSQL") {
        await Poll.updateOne({ [`question5.${req.body[key]}.name`]: req.body[key] }, { $inc: { [`question5.${req.body[key]}.votes`]: 1 } })
      }
      if (req.body[key] == "Not a Full-stack or Back-end Developer") {
        await Poll.updateOne({ [`question5.${req.body[key]}.name`]: req.body[key] }, { $inc: { [`question5.${req.body[key]}.votes`]: 1 } })
      }

      // question 6
      if (req.body[key] == "MongoDB") {
        await Poll.updateOne({ [`question6.${req.body[key]}.name`]: req.body[key] }, { $inc: { [`question6.${req.body[key]}.votes`]: 1 } })
      }
      if (req.body[key] == "MySQL") {
        await Poll.updateOne({ [`question6.${req.body[key]}.name`]: req.body[key] }, { $inc: { [`question6.${req.body[key]}.votes`]: 1 } })
      }
      if (req.body[key] == "PostgreSQL") {
        await Poll.updateOne({ [`question6.${req.body[key]}.name`]: req.body[key] }, { $inc: { [`question6.${req.body[key]}.votes`]: 1 } })
      }
      if (req.body[key] == "SQLite") {
        await Poll.updateOne({ [`question6.${req.body[key]}.name`]: req.body[key] }, { $inc: { [`question6.${req.body[key]}.votes`]: 1 } })
      }
      if (req.body[key] == "MariaDB") {
        await Poll.updateOne({ [`question6.${req.body[key]}.name`]: req.body[key] }, { $inc: { [`question6.${req.body[key]}.votes`]: 1 } })
      }
      if (req.body[key] == "Supabase") {
        await Poll.updateOne({ [`question6.${req.body[key]}.name`]: req.body[key] }, { $inc: { [`question6.${req.body[key]}.votes`]: 1 } })
      }
      if (req.body[key] == "Others") {
        await Poll.updateOne({ [`question6.${req.body[key]}.name`]: req.body[key] }, { $inc: { [`question6.${req.body[key]}.votes`]: 1 } })
      }
      if (req.body[key] == "Not a Full-stack or Back-end Developer") {
        await Poll.updateOne({ [`question6.${req.body[key]}.name`]: req.body[key] }, { $inc: { [`question6.${req.body[key]}.votes`]: 1 } })
      }

      // question 7
      if (req.body[key] == "Yes") {
        await Poll.updateOne({ [`question7.${req.body[key]}.name`]: req.body[key] }, { $inc: { [`question7.${req.body[key]}.votes`]: 1 } })
      }
      if (req.body[key] == "No") {
        await Poll.updateOne({ [`question7.${req.body[key]}.name`]: req.body[key] }, { $inc: { [`question7.${req.body[key]}.votes`]: 1 } })
      }

    }
    await TotalVotes.updateOne({}, { $inc: { totalVotes: 1 } })
    await AccountModel.updateOne({ email: req.cookies.email }, { $set: { status: "surveyed" } })
    res.redirect("/results")
  })

app.get("/blocked", async (req, res) => {
  const matches = await AccountModel.find({ email: req.cookies.email })
  if (matches.length == 1) {
    switch (matches[0].status) {
      case "blocked":
        return res.render("blocked")
      default:
        return res.redirect("/")
    }
  }
})

app.get("/results", async (req, res) => {
  const matches = await AccountModel.find({ email: req.cookies.email })
  if (matches.length == 1) {
    switch (matches[0].status) {
      case "surveyed":
        const surveyQuestions = await SurveyQuestionsModel.find()
        return res.render("results", { surveyQuestions })
      default:
        return res.redirect("/")
    }
  }
})

// -----------------------------------------API

app.get("/api/get-results", async (req, res) => {
  const polls = await Poll.find()
  const totalVotes = await TotalVotes.find()
  const bundle = { polls: polls[0], votes: totalVotes[0] }
  res.send(bundle)
})

// ---------------------------------------- FUNCTIONS

const sendOTP = async (recipientEmail) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.USER,
      pass: process.env.USER_PASS
    }
  })
  var otp = parseInt(Math.random() * 1_000_000);
  otp = String(otp).padStart(6, '0');
  const mailOptions = {
    from: {
      name: "OTP GENERATOR",
      address: process.env.USER
    },
    to: recipientEmail,
    subject: `Your OTP is ${otp}`,
    html: `Your OTP is <b>${otp}</b>`
  }
  await transporter.sendMail(mailOptions)
  return otp;
}


const sendMail = async (sender, message) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.USER,
      pass: process.env.USER_PASS
    }
  })
  const mailOptions = {
    from: {
      name: "MESSENGER",
      address: process.env.USER
    },
    to: process.env.FEEDBACK_ADDRESS,
    subject: `FEEDBACK/MESSAGE`,
    html:
      `
    <h3>From: ${sender}</h3>
    <p>${message}</p>
    `
  }
  await transporter.sendMail(mailOptions)
}

const startServer = async () => {
  await mongoose.connect(process.env.MONGO_URI)

  app.listen(PORT, () => {
    console.log(`server is live`)
  })

  setInterval(async () => {
    await OTPModel.deleteMany({ expiresAt: { $lt: new Date() } })
  }, cleanUpTime)
}

startServer()