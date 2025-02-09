const express = require("express")
const multer = require("multer")
const app = express()
const router = express.Router()

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log("hello world")
        cb(null, "uploads")
    },
    filename: (req, file, cb) => {
        console.log("hello world")
        cb(null, new Date().getTime() + "-" + file.originalname)
    }
})
const Upload = multer({ storage })



router.get("/", (req, res) => {
    res.render("index")
})

router.post("/", Upload.single("file"), (req, res) => {
    // console.log(req.file)
    res.redirect("/")
})




module.exports = router