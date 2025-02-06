const express           = require("express")
const app               = express()

const PORT              = process.env.PORT || 65_535

app.set("view engine", "ejs")

app.use(express.static("public"))

app.listen(PORT, () => console.log("Server is listening on port " + PORT))

app.get("/", (req,  res) =>  {
    res.render("index")
})


module.exports          = app