import Axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Container } from "react-bootstrap";
import { Image } from "react-bootstrap";
import { format, register } from "timeago.js";
import ModifyPost from "../src/components/ModifyPost";

export default function Post() {
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

	///// Import des données de la publication /////
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

	///// Import des données des commentaires ////
	const [comments, setComments] = useState([]);
	useEffect(() => {
		Axios.get("http://localhost:5000/api/comments", {
			headers: {
				Authorization: "Bearer " + token,
			},
		})
			.then((response) => {
				console.log(response.data);
				setComments(response.data);
			})
			.catch((err) => {
				console.log(err);
				// window.alert('Une erreur est survenue, veuillez réessayer plus tard. Si le problème persiste, contactez l\'administrateur du site');
			});
	}, [token]);

	///// Import des données sur l'utilisateur connecté /////
	const [user, setUser] = useState("");
	useEffect(() => {
		Axios.get(`http://localhost:5000/api/auth/user`, {
			headers: {
				Authorization: "Bearer " + token,
			},
		}).then((response) => {
			setUser(response.data);
		});
	}, [token]);

	const [commentToPost, setCommentToPost] = useState("");

	const selectPostComment = (e) => {
		setCommentToPost(e.target.value);
	};

	const handleComment = (postId) => {
		const value = `; ${document.cookie}`;
		const parts = value.split(`; token=`);
		const token = parts.pop().split(";").shift();
		console.log(commentToPost);
		let formData = new FormData();
		formData.append("Comments.commentText", commentToPost);
		Axios.post(`http://localhost:5000/api/comments/${postId}`, formData, {
			headers: {
				Authorization: "Bearer " + token,
			},
		})
			.then((response) => {
				console.log(response);
			})
			.catch((err) => console.log(err));
	};

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
										{post.User.firstName} {post.User.lastName}
									</span>
									<span className="post__topLeft__date">
										{" "}
										- posté {format(post.createdAt, "FR")}
									</span>
								</div>
								{/* <ModifyPost /> */}
								{/* <div className="post__topRight">
									<FontAwesomeIcon
										className="post__topRight__icon"
										icon={faEllipsisV}
										role="button"
										onClick={() => {
											setShow(true);
										}}
									/>
								</div> */}
							</div>
							<hr />
							<div className="post__center">
								<span className="post__center__text">{post.postTitle}</span>
								{post.postImg.endsWith("mp4") ||
								post.postImg.endsWith("mov") ||
								post.postImg.endsWith("avi") ? (
									<video
										className="post__center__video"
										src={imgUrl + post.postImg}
										width="600"
										controls
									></video>
								) : (
									<img
										className="post__center__img"
										src={`${imgUrl}${post.postImg}`}
										alt={post.postImg}
									/>
								)}
							</div>
							<div className="post__bottom">
								<div className="post__bottomLeft">
									<div className="post__bottomLeft__icons">
										<button className="post__bottomLeft__btn">
											<Image src="../assets/like.png" className="post__bottomLeft__icon" />
										</button>
										<span className="post__bottom__text likeCount">{post.likes}</span>
									</div>
									<div className="post__bottomLeft__icons">
										<button className="post__bottomLeft__btn">
											<Image src="../assets/dislike.png" className="post__bottomLeft__icon" />
										</button>
										<span className="post__bottom__text dislikeCount">{post.dislikes}</span>
									</div>
								</div>
								<button
									className="post__bottomRight"
									onClick={() => setShowComment((prev) => !prev)}
								>
									<Image src="../assets/comment.png" className="post__bottomRight__icon" />
									<span className="post__bottom__text">{post.Comments.length} commentaires</span>
								</button>
							</div>
							{/* {showComment && <Comment />} */}
							{showComment && (
								<>
									{comments.map((comment, key) => {
										if (comment.postId === post.id) {
											return (
												<div key={key} className="comment">
													<hr />
													<div className="comment__area">
														<Image
															src={
																comment.User.userImg
																	? `${avatarUrl}${comment.User.userImg}`
																	: "./assets/black_avatar.png"
															}
															className="comment__avatar"
															roundedCircle
														/>
														<div className="comment__comment">
															<div className="comment__name">
																{comment.User.firstName} {comment.User.lastName}
															</div>
															<div className="comment__text">{comment.commentText}</div>
														</div>
													</div>
												</div>
											);
										} else {
											return null;
										}
									})}
								</>
							)}
							<hr />
							{/* <form onSubmit={handleComment} className="sendComment"> */}
							<form className="sendComment">
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
							</form>
						</div>
					</Container>
				);
			})}
		</>
	);
}
