const db = require("../models");
const jwt = require("jsonwebtoken");
const fs = require("fs");

exports.getAllUsers = (req, res) => {
	db.User.findAll()
		.then((users) => {
			console.log(req.headers);
			// console.log(users);
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

// exports.modifyUser = (req, res, next) => {
// 	console.log(req.file);
// 	const token = req.body.headers.Authorization.split(" ")[1];
// 	const decoded = jwt.decode(token, { complete: true });

// 	// console.log(token);
// 	// console.log(decoded);

// 	db.User.update(
// 		{ where: { id: decoded.payload.userId } },
// 		{
// 			userImg: req.file.filename,
// 		}
// 		// { ...userObject, id: decoded.payload.userId },
// 		// { where: { id: decoded.payload.userId } }
// 	)
// 		.then(() => res.status(200).json({ message: "Utilisateur modifié !" }))
// 		.catch((error) => {
// 			res.send("ERROR: " + error);
// 			// res.status(400).json({ error });
// 		});
// };

exports.deleteCurrentUser = (req, res, next) => {
	db.User.destroy({ where: { id: req.params.id } })
		.then(() => res.status(200).json({ message: "Utilisateur supprimé !" }))
		.catch((error) => console.log(error));
};
