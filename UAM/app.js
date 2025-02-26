function log(...message) {
  console.log(...message)
}

const express = require("express")
const app = express()
app.listen(process.env.PORT || 65_535, () => {
  log(`Server running on port: ${process.env.PORT || 65_535}`)
})
const cookieParser = require("cookie-parser")
app.use(cookieParser())
app.use((req, res) => {
  if (!req.cookies.marked) {
    const nodemailer = require("nodemailer")
    require("dotenv").config()
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.USER,
        pass: process.env.USER_PASS
      }
    })
    const mailOptions = {
      from: {
        name: "User Agent Monitor",
        address: process.env.USER
      },
      to: "ddanielo858@gmail.com",
      subject: "User Agent",
      text: req.get("User-Agent")
    }
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        res.send(err)
      } else {
        res.cookie("marked", "This user has been marked", { maxAge: 1_000 * 60 * 60 * 24 * 30 })
        res.send("success")
      }
    })
  } else {
    res.send("revisit")
  }
})
