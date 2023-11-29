const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const fetch = require("node-fetch");

const app = express();

dotenv.config();

const port = process.env.PORT;

// middleware

app.use(express.json());             // for application/json
app.use(express.urlencoded());       // for application/x-www-form-urlencoded

app.use(express.static('public'));
// view engine
app.set('views', './views');
app.set('view engine', 'ejs');

// cors
app.use(cors({
    origin: 'http://127.0.0.1:5500',
    methods: ['GET', 'PUT', 'POST', 'DELETE']
}));

app.get('/', async (req, res) => {
    const response = await fetch('https://empleadosuaq.azurewebsites.net/api/home');
    const employees = await response.json();
    res.render('home', { employees })
})
app.listen(port, () => {
    console.log(`app is listening on port ${port}`);
})