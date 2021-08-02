const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const db = require("../models");

exports.signup = (req, res, next) => {
	const firstname = req.body.firstname;
	const lastname = req.body.lastname;
	const email = req.body.email;
	const userImg = req.file.filename;
	const password = req.body.password;

	const isPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
	const isAlpha = /^[a-zA-Zà-żÀ-Ż+\s+-]+$/;
	const isEmail =
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	if (!isAlpha.test(firstname)) {
		return res.status(400).json({ error: "Veuillez renseigner un prénom valide" });
	}
	if (!isAlpha.test(lastname)) {
		return res.status(400).json({ error: "Veuillez renseigner un nom valide" });
	}
	if (!isEmail.test(email)) {
		return res.status(400).json({ error: "Veuillez renseigner un email valide" });
	}
	if (!isPassword.test(password)) {
		return res.status(400).json({
			error:
				"Le mot de passe doit contenir 8 caractères dont 1 majuscule, 1 minuscule, 1 chiffre et 1 symbole.",
		});
	}
	db.User.findOne({ where: { email } }).then((userFound) => {
		if (!userFound) {
			bcrypt
				.hash(password, 10)
				.then((hash) => {
					// const userPicture = req.file
					// 	? {
					// 			userImg: req.file.filename,
					// 	  }
					// 	: {};
					db.User.create({
						firstname,
						lastname,
						email,
						password: hash,
						userImg,
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
		} else {
			return res.status(409).json({ error: "L'utilisateur existe déjà !" });
		}
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
