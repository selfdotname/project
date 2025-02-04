const express       = require("express");
const http          = require("http");
const { Server }    = require("socket.io");

const app           = express();
const PORT          = process.env.PORT || 65535

app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("index", {port: PORT, host: req.hostname, protocol: req.protocol})
})


const server        = http.createServer(app);
const io            = new Server(server);

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("message", (msg) => {
    console.log("Message received:", msg);
    socket.emit("message", "Message received!");
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

server.listen(PORT, () => console.log(`server listening on port ${PORT}`))
