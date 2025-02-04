const L         = require("./utilities/L")
const PORT      = process.env.PORT || 65535

// express http server
const express   = require("express")
const app       = express()

const server    = app.listen(PORT, () => L(`http server listening on port ${PORT}`))

app.set("view engine", "ejs")

app.get("/", (req, res) => {
    res.render("index", {name: "Obaro", port: PORT})
})

// web socket ws server
const ws        = require("ws")
const wss       = new ws.Server({server})


wss.on("listening", ()=>{
    L(`web socket is listening on port ${PORT}`)
})

wss.on("connection", wsc => {
    L("websocket connection established")

    wsc.on("close", () => {
        L("web socket client connection closed")
    })
} )





