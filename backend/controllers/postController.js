const fs = require("fs");
const jwt = require("jsonwebtoken");

const db = require("../models");

exports.createPost = (req, res, next) => {
	const token = req.headers.authorization.split(" ")[1];
	const decoded = jwt.decode(token, { complete: true });
	db.Post.create({
		postTitle: req.body.postTitle,
		postImg: req.file.filename,
		UserId: decoded.payload.userId,
	})
		.then((post) => res.status(201).json({ post }))
		.catch((err) => {
			res.send("ERROR: " + err);
		});
};

//// Obtenir les publications avec les utilisateurs liés
exports.getAllPosts = (req, res, next) => {
	db.Post.findAll({
		include: [db.User],
		order: [["createdAt", "DESC"]],
	})
		.then((posts) => {
			// console.log(posts);
			res.status(200).json(posts);
		})
		.catch((err) => {
			res.send("ERROR: " + err);
		});
	// .catch((error) => res.status(500).json({ error }));
};

exports.getCurrentPost = (req, res, next) => {
	const id = req.params.id;

	db.Post.findOne({
		where: { id },
		order: [["createdAt", "DESC"]],
		// order: [
		//     [req.query.sort ?? 'id', req.query.order ?? 'ASC']
		// ],
		// include: (req.query.include === 'user' ? [{ model: db.User, attributes: ['email'] }] : '')
	})
		.then((post) => {
			// console.log(post);
			res.status(200).json(post);
		})
		.catch((error) => res.status(500).json({ error }));
};

exports.modifyPost = (req, res, next) => {
	db.Post.findOne({ where: { id: req.params.id } })
		.then((post) => {
			const filename = post.imageUrl.split("/images/")[1];
			fs.unlink(`images/${filename}`, () => {
				post
					.deleteOne({ _id: req.params.id })
					.then(() => res.status(200).json({ message: "Publication supprimée !" }))
					.catch((error) => res.status(400).json({ error }));
			});
		})
		.catch((error) => res.status(500).json({ error }));
};

// exports.deletePost = (req, res, next) => {
// 	db.Post.findOne({ where: { id: req.params.id } })
// 		.then((post) => {
// 			const filename = post.imageUrl.split("/images/")[1];
// 			fs.unlink(`images/${filename}`, () => {
// 				post
// 					.deleteOne({ _id: req.params.id })
// 					.then(() => res.status(200).json({ message: "Publication supprimée !" }))
// 					.catch((error) => res.status(400).json({ error }));
// 			});
// 		})
// 		.catch((error) => res.status(500).json({ error }));
// };

///////// version postman /////////
exports.deletePost = (req, res, next) => {
	db.Post.findOne({ where: { id: req.params.id } })
		.then((post) => {
			post
				.destroy({ _id: req.params.id })
				.then(() => res.status(200).json({ message: "Publication supprimée !" }))
				.catch((error) => res.status(400).json({ error }));
		})
		.catch((err) => {
			res.send("ERROR: " + err);
		});
};

exports.LikePost = (req, res, next) => {
	const like = req.body.like;
	const userId = req.body.userId;
	const postId = req.params.id;

	if (like === 1) {
		db.Post.updateOne(
			{ where: { id: postId } }, // On récupère la sauce correspondante
			{
				$inc: { likes: +1 }, // On incrémente les likes de +1
				$push: { usersLiked: userId }, // On ajoute le user dans le tableau
			}
		)
			.then(() => res.status(201).json({ message: "Vous avez aimé cette sauce !" }))
			.catch((error) => res.status(400).json({ error }));
	}
	if (like === -1) {
		db.Post.updateOne(
			{ id: postId },
			{
				$inc: { dislikes: +1 }, // On incrémente les likes de +1
				$push: { usersDisliked: userId }, // On ajoute le user dans le tableau
			}
		)
			.then(() => res.status(201).json({ message: "Vous n'avez aimé cette sauce !" }))
			.catch((error) => res.status(400).json({ error }));
	}
	if (like === 0) {
		// Si il s'agit d'annuler un like ou un dislike
		Sauce.findOne({ _id: sauceId })
			.then((sauce) => {
				if (sauce.usersLiked.includes(userId)) {
					// Si l'utilisateur est dans le tableau des likes(il a déjà noté la sauce)
					Sauce.updateOne(
						{ _id: sauceId },
						{
							$inc: { likes: -1 }, // On incrémente les likes de -1
							$pull: { usersLiked: userId }, // On retire le user du tableau
						}
					)
						.then(() => res.status(201).json({ message: "Votre mention 'j'aime' a été retirée !" }))
						.catch((error) => res.status(400).json({ error }));
				}
				if (sauce.usersDisliked.includes(userId)) {
					// Si l'utilisateur est dans le tableau des dislikes(il a déjà noté la sauce)
					Sauce.updateOne(
						{ _id: sauceId },
						{
							$inc: { dislikes: -1 }, // On incrémente les likes de -1
							$pull: { usersDisliked: userId }, // On retire le user du tableau
						}
					)
						.then(() =>
							res.status(201).json({ message: "Votre mention 'je n'aime pas' a été retirée !" })
						)
						.catch((error) => res.status(400).json({ error }));
				}
			})
			.catch((error) => res.status(404).json({ error }));
	}
};
