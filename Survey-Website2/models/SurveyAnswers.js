const mongoose = require("mongoose")

const Schema = mongoose.Schema

const surveyAnswersSchema = new Schema({
  question1: {
    type:String,
    enum:["Front-end","Back-end","Full-stack"],
    required:true
  },
  question2: {
    type:String,
    enum:["JavaScript (Node.js)","Python","PHP","Java","Ruby","C#","Others","Not a Back-end or Full-stack Developer"],
    required:true
  },
  question3: {
    type:String,
    enum:["Web Builders (WordPress, Wix, Squarespace, Webflow, Shopify, Weebly, Framer)","HTML, CSS & JavaScript","Not a Front-end Developer"],
    required:true
  },
  question4: {
    type:String,
    enum:["React/Next.js","Vue/Nuxt.js","Angular","Svelte/SvelteKit","No frameworks","Others"],
    required:true
  },
  question5: {
    type:String,
    enum:["SQL","NoSQL","Not a Full-stack or Back-end Developer"],
    required:true
  },
  question6: {
    type:String,
    enum:["MongoDB","MySQL","PostgreSQL","SQLite","MariaDB","Supabase","Others","Not a Full-stack or Back-end Developer"],
    required:true
  },
  question7: {
    type:String,
    enum:["Yes","No"],
    required:true
  },
})

module.exports = mongoose.model("surveyanswers", surveyAnswersSchema)