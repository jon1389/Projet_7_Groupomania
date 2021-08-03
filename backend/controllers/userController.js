const db = require("../models");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");

exports.getAllUsers = (req, res) => {
	db.User.findAll()
		.then((users) => {
			console.log(req.headers);
			res.status(200).json({ users });
		})
		.catch((error) => res.status(404).json({ error }));
};

exports.getCurrentUser = (req, res, next) => {
	db.User.findOne({ where: { id: req.params.id } })
		.then((user) => {
			res.status(200).json(user);
		})
		.catch((error) => res.status(404).json({ error }));
};

exports.deleteCurrentUser = (req, res, next) => {
	db.User.findOne({ where: { id: req.params.id } }).then((user) => {
		const filename = user.userImg;
		if (filename != "random.png") {
			fs.unlink(`avatars/${filename}`, () => {
				db.User.destroy({ where: { id: req.params.id } })
					.then(() => res.status(200).json({ message: "Utilisateur supprimé !" }))
					.catch((error) => console.log(error));
			});
		} else {
			db.User.destroy({ where: { id: req.params.id } })
				.then(() => res.status(200).json({ message: "Utilisateur supprimé !" }))
				.catch((error) => console.log(error));
		}
	});
};
