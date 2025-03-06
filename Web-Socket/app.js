const express = require("express")
const WebSocket = require("ws")
const path = require("path")

const app = express()
const PORT = process.env.PORT || 65_535
const server = app.listen(PORT, function () { console.log(`Server live`) })
const wss = new WebSocket.Server({ server })


app.get("/", async function (req, res) {
  res.sendFile(path.join(__dirname, "index.html"))
})

wss.on("connection", function (ws) {
  console.log("New client connected")

  ws.on("message", function (message) {
    console.log("Message received: " + message)
    ws.send("Response from server")
  })

  ws.on("close", function () {
    console.log("Client disconnected")
  })
})
