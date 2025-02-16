const express = require("express")

const app = express()

app.listen(process.env.PORT, () => {
    console.log("server is listening on port " + process.env.PORT)
})

app.use((req, res) => {
    res.json({message: "site is running"})
})