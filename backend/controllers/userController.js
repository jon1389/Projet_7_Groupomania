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

exports.modifyUser = (req, res, next) => {
	console.log(req.body.firstname);
	const token = req.headers.authorization;
	const decoded = jwt.decode(token, { complete: true });

	console.log(token);
	console.log(decoded);

	db.User.update(
		{ where: { id: decoded.payload.userId, firstname: decoded.payload.firstname } },
		{
			firstname: req.body.firstname,
			// lastname: req.body.lastname,
			// userImg: req.file.filename,
		}
		// { ...userObject, id: decoded.payload.userId },
		// { where: { id: decoded.payload.userId } }
	)
		.then(() => res.status(200).json({ message: "Utilisateur modifié !" }))
		.catch((error) => {
			res.send("ERROR: " + error);
			// res.status(400).json({ error });
		});
};

exports.deleteCurrentUser = (req, res, next) => {
	db.Comment.findAll({ where: { UserId: req.params.id } })
		.then(db.Comment.destroy({ where: { UserId: req.params.id } }))
		.then(
			db.Post.findAll({ where: { UserId: req.params.id } }).then((post) => {
				const image = post.postImg;
				fs.unlink(`images/${image}`, () => {
					db.Post.destroy({ where: { UserId: req.params.id } })
						.then(() => res.status(200).json({ message: "Publication supprimé !" }))
						// .catch((error) => res.status(404).json({ error }));
						.catch((error) => console.log(error));
				});
			})
		)
		.then(
			db.User.findOne({ where: { id: req.params.id }, include: [db.Post] }).then((user) => {
				// console.log(req.params);
				const filename = user.userImg;
				fs.unlink(`images/${filename}`, () => {
					db.User.destroy({ where: { id: req.params.id } })
						.then(() => res.status(200).json({ message: "Utilisateur supprimé !" }))
						.catch((error) => res.status(404).json({ error }));
					// .catch((error) => console.log(error));
				});
			})
		)
		.catch((error) => console.log(error));
};
