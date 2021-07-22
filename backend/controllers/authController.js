const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const db = require('../models');

exports.signup = (req, res, next) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const password = req.body.password;
    const userImg = req.body.userImg;

    // Hash the user's password
    bcrypt.hash(password, 10)
        .then(hash => {
            // Create a new User and save it to the database
            db.User.create({
                firstName,
                lastName,
                email,
                password: hash,
                userImg,
            })
                .then(user => {
                    res.status(201).json({
                        token: jwt.sign(
                            {
                                userId: user.id,
                            },
                            process.env.TOKEN_ENCODED,
                            { expiresIn: '24h' }
                        ),
                    })
                })
                .catch(err => res.send('ERROR: ' + err))
        })
        .catch(err => {
            res.send('ERROR: ' + err)
        })
};

exports.login = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    db.User.findOne({ where: { email } })
    .then(user => {
        if (!user) {
            console.log('Utilisateur non trouvé !')
            return res.status(401).json({ error: 'Utilisateur non trouvé !' });
        }
        bcrypt.compare(password, user.password)
        .then(valid => {
                if (!valid) {
                    console.log('Mot de passe incorrect !')
                    return res.status(401).json({ error: 'Mot de passe incorrect !' });
                }
                res.status(200).json({
                userId: user._id,
                token: jwt.sign(
                    { userId: user._id },
                    process.env.TOKEN_ENCODED,
                    { expiresIn: '24h' },
                    )
                });
                console.log(user)
            })
            .catch(err => {
                res.send('ERROR: ' + err)
            });
    })
    .catch(err => {
        res.send('ERROR: ' + err)
    });
};

exports.getCurrentUser = (req, res, next) => {
    db.User.findOne({ where: { id: res.locals.userId } })
        .then(user => {
            return res.status(200).json({
                email: user.email,
            });
        })
        .catch(error => res.status(500).json({ error }))
}
