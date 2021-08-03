const db = require("../models");
const jwt = require("jsonwebtoken");

exports.createComment = (req, res, next) => {
	const token = req.headers.authorization.split(" ")[1];
	const decoded = jwt.decode(token, { complete: true });
	db.Comment.create({
		commentText: req.body.comment,
		PostId: req.params.idPost,
		UserId: decoded.payload.userId,
	})
		.then((comment) => res.status(201).json({ comment }))
		.catch((error) => res.status(400).json({ error }));
};

exports.getAllComments = (req, res, next) => {
	db.Comment.findAll({
		include: [db.User, db.Post],
		order: [["createdAt", "ASC"]],
	})
		.then((comments) => {
			res.status(200).json(comments);
		})
		.catch((error) => res.status(404).json({ error }));
};

exports.getCommentById = (req, res, next) => {
	const id = req.params.id;
	db.Comments.findOne({
		where: {
			id,
		},
		include: [db.User, db.Post],
	})
		.then((comments) => {
			res.status(200).json(comments);
		})
		.catch((error) => res.status(404).json({ error }));
};

exports.deleteComment = (req, res, next) => {
	const token = req.headers.authorization.split(" ")[1];
	const decoded = jwt.decode(token, { complete: true });
	console.log(req.params.id);
	db.Comment.findOne({ where: { id: req.params.id } }).then((comment) => {
		if (comment.UserId === decoded.payload.userId) {
			db.Comment.destroy({ where: { id: req.params.id } })
				.then(() => res.status(200).json({ message: "Commentaire supprimé !" }))
				.catch((error) => res.status(400).json({ error }));
		} else {
			res.status(401).json("Vous ne pouvez pas supprimer ce commentaire");
			console.log("Vous ne pouvez pas supprimer ce commentaire");
		}
	});
};
