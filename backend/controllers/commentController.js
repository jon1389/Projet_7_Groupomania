const db = require("../models");
const jwt = require("jsonwebtoken");

exports.createComment = (req, res, next) => {
	const token = req.headers.authorization.split(" ")[1];
	const decoded = jwt.decode(token, { complete: true });
	// console.log(req.body.comment);
	db.Comment.create({
		commentText: req.body.comment,
		PostId: req.params.idPost,
		UserId: decoded.payload.userId,
	})
		.then((comment) => res.status(201).json({ comment }))
		.catch((err) => {
			res.send("ERROR: " + err);
		});
};

exports.getAllComments = (req, res, next) => {
	db.Comment.findAll({
		include: [db.User, db.Post],
		order: [["createdAt", "DESC"]],
		// order: [
		//     [req.query.sort ?? 'id', req.query.order ?? 'ASC']
		// ],
		// include: (req.query.include === 'user' ? [{ model: db.User, attributes: ['email'] }] : '')
	})
		.then((comments) => {
			console.log(comments);
			res.status(200).json(comments);
		})
		.catch((error) => res.status(500).json({ error }));
};

exports.getCommentById = (req, res, next) => {
	// console.log(req.headers.authorization.split(" ")[1]);
	// const token = req.headers.authorization.split(" ")[1];
	// const decoded = jwt.decode(token, { complete: true });
	const id = req.params.id;
	db.Comments.findOne({
		where: {
			id,
			// order: [["createdAt", "DESC"]],
			// order: [
			//     [req.query.sort ?? 'id', req.query.order ?? 'ASC']
			// ],
			// include: (req.query.include === 'user' ? [{ model: db.User, attributes: ['email'] }] : '')
		},
		include: [db.User, db.Post],
	})
		.then((comments) => {
			console.log(comments);
			res.status(200).json(comments);
		})
		.catch((error) => res.status(500).json({ error }));
};
