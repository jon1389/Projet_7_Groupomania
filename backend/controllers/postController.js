const fs = require("fs");
const jwt = require("jsonwebtoken");

const db = require("../models");

exports.createPost = (req, res, next) => {
	const token = req.headers.authorization.split(" ")[1];
	const decoded = jwt.decode(token, { complete: true });
	const title = req.body.postTitle == "undefined" ? (req.body.postTitle = "") : req.body.postTitle;
	db.Post.create({
		postTitle: title,
		postImg: req.file.filename,
		UserId: decoded.payload.userId,
	})
		.then((post) => res.status(201).json({ post }))
		.catch((error) => res.status(500).json({ error }));
};

//// Obtenir les publications avec les utilisateurs liés
exports.getAllPosts = (req, res, next) => {
	db.Post.findAll({
		include: [db.User, db.Comment],
		order: [["createdAt", "DESC"]],
	})
		.then((posts) => {
			res.status(200).json(posts);
		})
		.catch((error) => res.status(500).json({ error }));
};

exports.getCurrentPost = (req, res, next) => {
	const id = req.params.id;

	db.Post.findOne({
		where: { id },
		order: [["createdAt", "DESC"]],
	})
		.then((post) => {
			res.status(200).json(post);
		})
		.catch((error) => res.status(500).json({ error }));
};

exports.modifyPost = (req, res, next) => {
	const token = req.headers.authorization.split(" ")[1];
	const decoded = jwt.decode(token, { complete: true });

	db.Post.findOne({ where: { id: req.params.id } }).then((post) => {
		if (post.UserId === decoded.payload.userId) {
			const postPicture = req.file ? req.file.filename : post.postImg;
			const title = req.body.postTitle ? req.body.postTitle : post.postTitle;
			db.Post.update(
				{
					postTitle: title,
					postImg: postPicture,
				},
				{ where: { id: req.params.id } }
			)
				.then((post) => res.status(200).json({ post }))
				.catch((error) => res.status(500).json({ error }));
		} else {
			res.status(401).json("Vous ne pouvez pas modifier cette publication");
		}
	});
};

exports.deletePost = (req, res, next) => {
	const token = req.headers.authorization.split(" ")[1];
	const decoded = jwt.decode(token, { complete: true });
	db.Post.findOne({ where: { id: req.params.id } }).then((post) => {
		if (post.UserId === decoded.payload.userId) {
			const filename = post.postImg;
			fs.unlink(`images/${filename}`, () => {
				db.Post.destroy({ where: { id: req.params.id, UserId: decoded.payload.userId } })
					.then(() => res.status(200).json({ message: "Publication supprimée !" }))
					.catch((error) => res.status(500).json({ error }));
			});
		} else {
			res.status(401).json("Vous ne pouvez pas supprimer cette publication");
		}
	});
};
