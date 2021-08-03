const db = require("../models");
const jwt = require("jsonwebtoken");
const Sequelize = require("sequelize");

exports.findAllLikes = (req, res, next) => {
	console.log(req.params);
	db.Like.findAll({
		include: [db.User, db.Post],
	})
		.then((likes) => {
			// console.log(likes);
			res.status(200).json({ data: likes });
		})
		.catch((err) => {
			res.send("ERROR: " + err);
		});
	// .catch((error) => res.status(400).json({ error }));
};

exports.findLikesById = (req, res, next) => {
	console.log(req.params);
	const id = req.params.id;

	db.Like.findOne({
		where: {
			id,
		},
		include: [db.User, db.Post],
	})
		.then((likes) => {
			console.log(likes);
			res.status(200).json({ likes });
		})
		.catch((err) => {
			res.send("ERROR: " + err);
		});
	// .catch((error) => res.status(400).json({ error }));
};

exports.createLike = (req, res, next) => {
	const token = req.body.headers.Authorization;
	const decoded = jwt.decode(token, { complete: true });
	db.Like.findOne({
		where: {
			PostId: req.params.id,
			UserId: decoded.payload.userId,
		},
	})
		.then((likes) => {
			if (!likes) {
				db.Like.create(
					{
						like: "1",
						PostId: req.params.id,
						UserId: decoded.payload.userId,
					},
					{ where: { PostId: req.params.id } }
				);
				// .then(() => {
				// 	db.Dislike.findOne({
				// 		where: {
				// 			PostId: req.params.id,
				// 			UserId: decoded.payload.userId,
				// 		},
				// 	}).then((dislikes) => {
				// 		if (dislikes) {
				// 			db.Dislike.destroy({ where: { PostId: req.params.id } });
				// 		}
				// 	});
				// });
			} else {
				db.Like.destroy({ where: { PostId: req.params.id } });
				console.log("error");
			}
		})
		.then(() => res.status(201).json({ message: "Vous avez aimé cette publication !" }))
		.catch((error) => res.status(400).json({ error }));
};
