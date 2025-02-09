const express = require("express")
const app = express()
const PORT = process.env.PORT || 65_535
const indexRoutes = require("./routes/indexRoutes")

app.set("view engine", "ejs")

app.use(express.urlencoded({ extended: true }))

app.get("/", indexRoutes)

app.post("/", indexRoutes)

app.listen(PORT, () => {
    console.log("server listening on port " + PORT)
})