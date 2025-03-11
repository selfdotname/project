const express = require("express")
const mongoose = require("mongoose")
const session = require("express-session")
const Blog = require("./models/Blog")
require("dotenv").config({ path: "config/.env" })

// constants
const app = express()
const PORT = process.env.PORT || 3000
const admin = { username: "admin", password: "password" }

// configuration
app.set("view engine", "pug")

// middleware
app.use(express.static("public"))
app.use(express.urlencoded({ extended: true }))
app.use(session({
  secret: process.env.MY_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))

// routes
app.get("/", async (req, res) => {
  const projection = { _id: 1, title: 1, body: 1, author: 1, date: 1 }
  const blogs = await Blog.find({}, projection).sort({ date: -1 })
  if (req.session.user) {
    return res.render("index", { blogs, user: req.session.user })
  }
  res.render("index", { blogs })
})

app.get("/blog/:id", async (req, res) => {
  const id = req.params.id
  const filter = { _id: new mongoose.Types.ObjectId(id) }
  const blog = await Blog.findOne(filter)
  if (blog) {
    if (blog.comments.length > 0) {
      blog.comments.sort((a, b) => b.date - a.date)
      for (const comment of blog.comments) {
        if (comment.replies.length > 0) {
          comment.replies.sort((a, b) => b.date - a.date)
        }
      }
    }
    res.render("blog", { blog })
  } else {
    res.redirect("/")
  }
})

app.get("/login", (req, res) => res.render("log-in"))

app.post("/login", (req, res) => {
  if (admin.username === req.body.username
    && admin.password === req.body.password) {
    req.session.user = admin.username
    res.redirect("/")
  } else {
    res.render("log-in", { message: "Invalid credentials" })
  }
})

app.get("/logout", (req, res) => {
  req.session.destroy()
  res.redirect("/")
})

app.get("/delete/:id", async (req, res) => {
  if (req.session.user) {
    const id = req.params.id
    const filter = { _id: new mongoose.Types.ObjectId(id) }
    await Blog.deleteOne(filter)
    res.redirect("/")
  } else {
    res.redirect("/")
  }
})

app.get("/edit/:id", async (req, res) => {
  if (req.session.user) {
    const id = req.params.id
    const filter = { _id: new mongoose.Types.ObjectId(id) }
    const projection = { _id: 1, title: 1, body: 1 }
    const blog = await Blog.findOne(filter, projection)
    if (blog) res.render("edit", { blog })
    else res.redirect("/")
  } else {
    res.redirect("/")
  }
})

app.post("/edit", async (req, res) => {
  const filter = { _id: req.body.id }
  const update = { $set: { title: req.body.title, body: req.body.body } }
  await Blog.updateOne(filter, update)
  res.redirect("/")
})

app.get("/create", (req, res) => {
  if (req.session.user) {
    res.render("post")
  } else {
    res.redirect("/")
  }
})

app.post("/create", async (req, res) => {
  const author = req.session.user.charAt(0).toUpperCase() + req.session.user.slice(1)
  const blog = { title: req.body.title, body: req.body.body, author }
  await Blog.create(blog)
  res.redirect("/")
})

app.use((req, res) => {
  res.redirect("/")
})

// server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`http://localhost:${PORT}`)
    })
  })
  .catch(err => {
    console.log(err)
  })