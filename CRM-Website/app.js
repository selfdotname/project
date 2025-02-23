const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 65_535;

// Connect to MongoDB
mongoose.connect('mongodb+srv://obaro:mypassword@cluster0.8lgns.mongodb.net/mydb?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => {
        // Start server
        app.listen(PORT, () => {
            console.log(`CRM app running at http://localhost:${PORT}`);
        });
    })

const customerSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    notes: String,
    createdAt: { type: Date, default: Date.now },
});

const Customer = mongoose.model('Customer', customerSchema);

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Set EJS as the templating engine
app.set('view engine', 'ejs');

// Routes
app.get('/', async (req, res) => {
    const customers = await Customer.find();
    res.render('index', { customers });
});

app.post('/add-customer', async (req, res) => {
    const { name, email, phone, notes } = req.body;
    await Customer.create({ name, email, phone, notes });
    res.redirect('/');
});

app.post('/delete-customer/:id', async (req, res) => {
    await Customer.findByIdAndDelete(req.params.id);
    res.redirect('/');
});



