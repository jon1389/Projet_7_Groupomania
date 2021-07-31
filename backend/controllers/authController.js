const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const db = require("../models");

exports.signup = (req, res, next) => {
	const password = req.body.password;

	bcrypt
		.hash(password, 10)
		.then((hash) => {
			// const userPicture = req.file
			// 	? {
			// 			userImg: req.file.filename,
			// 	  }
			// 	: {};
			db.User.create({
				firstname: req.body.firstname,
				lastname: req.body.lastname,
				email: req.body.email,
				password: hash,
				userImg: req.file.filename,
			})
				.then((user) => {
					res.status(201).json({
						token: jwt.sign(
							{
								userId: user.id,
							},
							process.env.TOKEN_ENCODED,
							{ expiresIn: "24h" }
						),
						user,
					});
				})
				.catch((error) => {
					const message = `probleme : ${error}`;
					console.log(message);
					res.status(400).json({ error });
				});
		})
		.catch((error) => {
			const message = `probleme : ${error}`;
			console.log(message);
			res.status(500).send({ error });
		});
};

exports.login = (req, res, next) => {
	const email = req.body.email;
	const password = req.body.password;
	db.User.findOne({ where: { email } })
		.then((user) => {
			if (!user) {
				console.log("Utilisateur non trouvé !");
				return res.status(401).json({ error: "Utilisateur non trouvé !" });
			}
			bcrypt
				.compare(password, user.password)
				.then((valid) => {
					if (!valid) {
						console.log("Mot de passe incorrect !");
						return res.status(401).json({ error: "Mot de passe incorrect !" });
					}
					res.status(200).json({
						userId: user.id,
						token: jwt.sign({ userId: user.id }, process.env.TOKEN_ENCODED, {
							expiresIn: "24h",
						}),
					});
				})
				.catch((err) => {
					res.send("ERROR: " + err);
				});
		})
		.catch((err) => {
			res.send("ERROR: " + err);
		});
};
