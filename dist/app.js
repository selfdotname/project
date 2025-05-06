const express = require("express")
const path = require("path")

const app = express()

// Serve static files like CSS/JS
app.use(express.static(path.join(__dirname)))

// Serve index.html for the root
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"))
})

// Listen on correct port and log it properly
app.listen(3000, () => console.log("http://localhost:3000"))
