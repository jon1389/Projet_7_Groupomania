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

    bcrypt.hash(password, 10)
        .then(hash => {
            db.User.create({
                firstName: firstName,
                lastName: lastName,
                email : email,
                password: hash,
                userImg: userImg,
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
                .catch(error => res.status(400).json({ error }))
        })
        .catch(error => {
            const message = `probleme : ${error.field}`
            console.log(message)
            res.status(500).send({ error })})
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
                userId: user.id,
                token: jwt.sign(
                    { userId: user.id },
                    process.env.TOKEN_ENCODED,
                    { expiresIn: '24h' },
                    )
                });
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
    console.log(req.headers.authorization.split(' ')[1]);
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.decode(token, {complete: true})
    db.User.findOne({ where: { id: decoded.payload.userId } })
        .then(user => {
            return res.status(200).json({
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                userImg: user.userImg,
            });
        })
        .catch(err => {
            res.send('ERROR: ' + err)
        });
}
