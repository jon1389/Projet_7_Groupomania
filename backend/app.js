require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const db = require('./models');

const authRoutes = require('./routes/authRoutes');


// Configuring CORS Headers
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    res.setHeader("Access-Control-Allow-Credentials", "true");
    next();
});

app.use(bodyParser.json());

// Connexion à la base de donnée
db.sequelize
    .authenticate()
    .then(() => {
        console.log('Connexion à la base de donnée établie');
    })
    .catch(error => {
        console.log('Echec de la connexion à la base : ', error);
    })


app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/auth', authRoutes);

module.exports = app;