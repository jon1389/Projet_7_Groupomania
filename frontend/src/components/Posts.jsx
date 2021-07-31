import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Container, Image } from "react-bootstrap";
import Axios from "axios";
import LikeDislike from "./LikeDislike";
import { format, register } from "timeago.js";
import Comment from "./Comment";
import CreateComment from "./CreateComment";

export default function Post(handleComment) {
	const avatarUrl = "http://localhost:5000/avatars/";
	const imgUrl = "http://localhost:5000/images/";
	const Timeago = (number: number, index: number): [string, string] => {
		return [
			["à l'instant", "dans un instant"],
			["il y a %s secondes", "dans %s secondes"],
			["il y a 1 minute", "dans 1 minute"],
			["il y a %s minutes", "dans %s minutes"],
			["il y a 1 heure", "dans 1 heure"],
			["il y a %s heures", "dans %s heures"],
			["il y a 1 jour", "dans 1 jour"],
			["il y a %s jours", "dans %s jours"],
			["il y a 1 semaine", "dans 1 semaine"],
			["il y a %s semaines", "dans %s semaines"],
			["il y a 1 mois", "dans 1 mois"],
			["il y a %s mois", "dans %s mois"],
			["il y a 1 an", "dans 1 an"],
			["il y a %s ans", "dans %s ans"],
		][index];
	};
	register("FR", Timeago);
	const [showComment, setShowComment] = useState(false);

	const [post, setPost] = useState([]);
	const value = `; ${document.cookie}`;
	const parts = value.split(`; token=`);
	const token = parts.pop().split(";").shift();
	useEffect(() => {
		Axios.get("http://localhost:5000/api/posts", {
			headers: {
				Authorization: "Bearer " + token,
			},
		})
			.then((response) => {
				console.log(response.data);
				setPost(response.data);
			})
			.catch((err) => {
				console.log(err);
				// window.alert('Une erreur est survenue, veuillez réessayer plus tard. Si le problème persiste, contactez l\'administrateur du site');
			});
	}, [token]);

	return (
		<>
			{post.map((post, key) => {
				return (
					<Container key={key} className="post">
						<div className="post__container">
							<div className="post__top">
								<div className="post__topLeft">
									<img
										className="post__topLeft__img"
										src={
											post.User.userImg
												? avatarUrl + post.User.userImg
												: "./assets/black_avatar.png"
										}
										alt="Profil"
									/>
									<span className="post__topLeft__username">
										{post.User.firstname} {post.User.lastname}
									</span>
									<span className="post__topLeft__date">
										- posté {format(post.createdAt, "FR")}
									</span>
								</div>
								<div className="post__topRight">
									<FontAwesomeIcon
										className="post__topRight__icon"
										icon={faEllipsisV}
										role="button"
									/>
								</div>
							</div>
							<hr />
							<div className="post__center">
								<span className="post__center__text">{post.postTitle}</span>
								<img
									className="post__center__img"
									src={`${imgUrl}${post.postImg}`}
									alt={post.postImg}
								/>
							</div>
							<div className="post__bottom">
								<LikeDislike />
								{/* <Comment post={post} /> */}
								<button
									className="post__bottomRight"
									onClick={() => setShowComment((prev) => !prev)}
								>
									<Image src="../assets/comment.png" className="post__bottomRight__icon" />
									<span className="post__bottom__text">0 commentaires</span>
								</button>
							</div>
						</div>

						{showComment && <Comment post={post} />}
						<hr />
						<CreateComment post={post} />
						{/* <form onSubmit={handleComment} className="sendComment"> */}
						{/* <form className="sendComment">
					<Image
						src={user.userImg ? `${avatarUrl}${user.userImg}` : "./assets/black_avatar.png"}
						className="comment__avatar"
						roundedCircle
					/>
					<input
						as="textarea"
						className="sendComment__input"
						placeholder="Écrivez un commentaire ..."
						onChange={selectPostComment}
					/>
					<Image
						type="submit"
						src="./assets/plus.png"
						className="sendComment__icon"
						roundedCircle
						role="button"
						onClick={() => handleComment(post.id)}
					/>
				</form> */}
					</Container>
				);
			})}
		</>
	);
}
