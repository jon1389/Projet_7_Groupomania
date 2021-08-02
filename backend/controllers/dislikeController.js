const db = require("../models");
const jwt = require("jsonwebtoken");

exports.findAllDisLikes = (req, res, next) => {
	console.log(req.params);
	db.Dislike.findAll({
		include: [db.User, db.Post],
	})
		.then((dislikes) => {
			// console.log(likes);
			res.status(200).json({ data: dislikes });
		})
		.catch((err) => {
			res.send("ERROR: " + err);
		});
	// .catch((error) => res.status(400).json({ error }));
};

exports.findDislikesById = (req, res, next) => {
	console.log(req.params);
	const id = req.params.id;

	db.Dislike.findOne({
		where: {
			id,
		},
		include: [db.User, db.Post],
	})
		.then((dislikes) => {
			console.log(dislikes);
			res.status(200).json({ dislikes });
		})
		.catch((err) => {
			res.send("ERROR: " + err);
		});
	// .catch((error) => res.status(400).json({ error }));
};

exports.createDislike = (req, res, next) => {
	const token = req.body.headers.Authorization;
	const decoded = jwt.decode(token, { complete: true });
	db.Dislike.findOne({
		where: {
			PostId: req.params.id,
			UserId: decoded.payload.userId,
		},
	})
		.then((dislikes) => {
			if (!dislikes) {
				db.Dislike.create(
					{
						dislike: "1",
						PostId: req.params.id,
						UserId: decoded.payload.userId,
					},
					{ where: { PostId: req.params.id } }
				).then(() => {
					db.Like.findOne({
						where: {
							PostId: req.params.id,
							UserId: decoded.payload.userId,
						},
					}).then((likes) => {
						if (!likes) {
							db.Like.create(
								{
									like: "1",
									PostId: req.params.id,
									UserId: decoded.payload.userId,
								},
								{ where: { PostId: req.params.id } }
							);
						} else {
							db.Like.destroy({ where: { PostId: req.params.id } });
							console.log("error");
						}
					});
				});
			} else {
				db.Dislike.destroy({ where: { PostId: req.params.id } });
				console.log("error");
			}
		})
		.then(() => res.status(201).json({ message: "Vous n'avez pas aimé cette publication !" }))
		.catch((error) => res.status(400).json({ error }));
};
