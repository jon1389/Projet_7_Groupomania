const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
require('dotenv').config()

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const bcrypt = require('bcrypt');
const saltRounds = 10;

const app = express();

app.use(express.json());

app.use(function (req, res, next) {
    //Enabling CORS
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");
    next();
});

// app.use(
//     cors({
//         origin: "http://localhost:5000",
//         methods: ["GET", "POST"],
//         credentials: true,
//     })
// );
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    key: "userId",
    secret: process.env.SECRET_SESSION,
    resave: false,
    saveUninitialized: false,
    cookie: {secure: true, maxAge: 10000}
    })
);

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE 
});

db.connect( (error) => {
    if(error) {
        console.log(error)
    } else {
        console.log("Connexion à la base de donnée établie")
    }
})

app.post("/signup", (req, res, next) => {
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const email = req.body.email;
    const password = req.body.password;
    const profileImg = req.body.profileImg;

    bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) {
            console.log(err)
        }
        db.query("INSERT INTO users (firstname, lastname, email, password, profileImg) VALUES (?, ?, ?, ?, ?)", 
        [firstname, lastname, email, hash, profileImg],
        (error, result) =>{
            console.log(error);
        });
    })
    next();
});

app.get("/login", (req, res, next) => {
    if (req.session) {
        console.log(req.session)
        console.log(req.session.id)
        res.send({ loggedIn: true, user: req.session });
    } else {
        res.send({ loggedIn: false });
    }
    next();
});

app.post("/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    db.query("SELECT * FROM users WHERE email = ?;", 
    [email],
    (err, result) =>{
        if(err){
            res.send({err: err});
        }

        if (result.length > 0) {
            bcrypt.compare(password, result[0].password, (error, response) =>{
                if (response){
                    req.session.user = result;
                    console.log(req.session.user);
                    res.send(result)
                } else {
                    res.send({message : "L'adresse email ou le mot de passe est incorrect !"})
                }
            })
        } else {
            res.send({message : "L'utilisateur n'existe pas !"})
        }
    });
});


app.listen(5000, () => {
    console.log("Serveur démarré sur le port 5000");
})