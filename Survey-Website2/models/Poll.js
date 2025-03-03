const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const pollsSchema = new Schema({
  question1: {
    "Front-End": { name: { type: String, required: true, default: "Front-End" }, votes: { type: Number, required: true, default: 0 } },
    "Back-end": { name: { type: String, required: true, default: "Back-end" }, votes: { type: Number, required: true, default: 0 } },
    "Full-stack": { name: { type: String, required: true, default: "Full-stack" }, votes: { type: Number, required: true, default: 0 } }
  },

  question2: {
    "JavaScript (Nodejs)": { name: { type: String, required: true, default: "JavaScript (Nodejs)" }, votes: { type: Number, required: true, default: 0 } },
    "Python": { name: { type: String, required: true, default: "Python" }, votes: { type: Number, required: true, default: 0 } },
    "PHP": { name: { type: String, required: true, default: "PHP" }, votes: { type: Number, required: true, default: 0 } },
    "Java": { name: { type: String, required: true, default: "Java" }, votes: { type: Number, required: true, default: 0 } },
    "Ruby": { name: { type: String, required: true, default: "Ruby" }, votes: { type: Number, required: true, default: 0 } },
    "C#": { name: { type: String, required: true, default: "C#" }, votes: { type: Number, required: true, default: 0 } },
    "Others": { name: { type: String, required: true, default: "Others" }, votes: { type: Number, required: true, default: 0 } },
    "Not a Back-end or Full-stack Developer": { name: { type: String, required: true, default: "Not a Back-end or Full-stack Developer" }, votes: { type: Number, required: true, default: 0 } }
  },

  question3: {
    "Web Builders (WordPress, Wix, etc)": { name: { type: String, required: true, default: "Web Builders (WordPress, Wix, etc)" }, votes: { type: Number, required: true, default: 0 } },
    "HTML, CSS & JavaScript": { name: { type: String, required: true, default: "HTML, CSS & JavaScript" }, votes: { type: Number, required: true, default: 0 } },
    "Not a Front-end Developer": { name: { type: String, required: true, default: "Not a Front-end Developer" }, votes: { type: Number, required: true, default: 0 } }
  },

  question4: {
    "React/Nextjs": { name: { type: String, required: true, default: "React/Nextjs" }, votes: { type: Number, required: true, default: 0 } },
    "Vue/Nuxtjs": { name: { type: String, required: true, default: "Vue/Nuxtjs" }, votes: { type: Number, required: true, default: 0 } },
    "Angular": { name: { type: String, required: true, default: "Angular" }, votes: { type: Number, required: true, default: 0 } },
    "Svelte/SvelteKit": { name: { type: String, required: true, default: "Svelte/SvelteKit" }, votes: { type: Number, required: true, default: 0 } },
    "No frameworks": { name: { type: String, required: true, default: "No frameworks" }, votes: { type: Number, required: true, default: 0 } },
    "Others": { name: { type: String, required: true, default: "Others" }, votes: { type: Number, required: true, default: 0 } }
  },

  question5: {
    "SQL": { name: { type: String, required: true, default: "SQL" }, votes: { type: Number, required: true, default: 0 } },
    "NoSQL": { name: { type: String, required: true, default: "NoSQL" }, votes: { type: Number, required: true, default: 0 } },
    "Not a Full-stack or Back-end Developer": { name: { type: String, required: true, default: "Not a Full-stack or Back-end Developer" }, votes: { type: Number, required: true, default: 0 } }
  },

  question6: {
    "MongoDB": { name: { type: String, required: true, default: "MongoDB" }, votes: { type: Number, required: true, default: 0 } },
    "MySQL": { name: { type: String, required: true, default: "MySQL" }, votes: { type: Number, required: true, default: 0 } },
    "PostgreSQL": { name: { type: String, required: true, default: "PostgreSQL" }, votes: { type: Number, required: true, default: 0 } },
    "SQLite": { name: { type: String, required: true, default: "SQLite" }, votes: { type: Number, required: true, default: 0 } },
    "MariaDB": { name: { type: String, required: true, default: "MariaDB" }, votes: { type: Number, required: true, default: 0 } },
    "Supabase": { name: { type: String, required: true, default: "Supabase" }, votes: { type: Number, required: true, default: 0 } },
    "Others": { name: { type: String, required: true, default: "Others" }, votes: { type: Number, required: true, default: 0 } },
    "Not a Full-stack or Back-end Developer": { name: { type: String, required: true, default: "Not a Full-stack or Back-end Developer" }, votes: { type: Number, required: true, default: 0 } }
  },

  question7: {
    "Yes": { name: { type: String, required: true, default: "Yes" }, votes: { type: Number, required: true, default: 0 } },
    "No": { name: { type: String, required: true, default: "No" }, votes: { type: Number, required: true, default: 0 } }
  }
});

module.exports = mongoose.model("polls", pollsSchema);

// All options now have a name field set to themselves! 🚀
