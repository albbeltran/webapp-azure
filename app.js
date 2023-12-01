const express = require('express');
const dotenv = require('dotenv');
const fetch = require("node-fetch");

const app = express();

dotenv.config();

const port = process.env.PORT || 5000;

// middleware

app.use(express.json());             // for application/json
app.use(express.urlencoded());       // for application/x-www-form-urlencoded

app.use(express.static('public'));
// view engine
app.set('views', './views');
app.set('view engine', 'ejs');

app.get('/', async (req, res) => {
    const response = await fetch('https://empleadosuaq.azurewebsites.net/api/home');
    const employees = await response.json();
    res.render('home', { employees })
})
app.listen(port, () => {
    console.log(`app is listening on port ${port}`);
})