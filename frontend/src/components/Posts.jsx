import React, { useEffect, useState } from "react";
import { Container, Image } from "react-bootstrap";
import Axios from "axios";
import { format, register } from "timeago.js";
import { Timeago } from "../functions/Timeago";
import Comment from "./Comment";
import ModifyPost from "./ModifyPost";
import jwt_decode from "jwt-decode";
import CreatePost from "./CreatePost";

export default function Post() {
	const avatarUrl = "http://localhost:5000/avatars/";
	const imgUrl = "http://localhost:5000/images/";
	register("FR", Timeago);
	const token = sessionStorage.getItem("token");
	const decoded = jwt_decode(token);
	const userId = decoded.userId;
	const userImg = decoded.userImg;

	/// Vérifier si l'utilisateur est bien connecté/autorisé ///
	const [connected, setConnected] = useState();
	useEffect(() => {
		if (token) setConnected(true);
		else setConnected(false);
	}, [token]);

	/// Fonction pour le re-render ///
	const [isUpdate, setIsUpdate] = useState(false);
	function HandleUpdate() {
		if (isUpdate === true) {
			setIsUpdate(false);
		} else {
			setIsUpdate(true);
		}
	}

	const [showComment, setShowComment] = useState(false);

	/// Récupération des publications ///
	const [post, setPost] = useState([]);
	useEffect(() => {
		Axios.get("http://localhost:5000/api/posts", {
			headers: {
				Authorization: "Bearer " + token,
			},
		})
			.then((response) => {
				setPost(response.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [token, isUpdate]);

	/// Commenter la publication ///
	const [comment, setComment] = useState();
	const selectTextComment = (e) => {
		setComment(e.target.value);
	};
	const handleComment = (postContent) => {
		const id = postContent;
		const token = sessionStorage.getItem("token");

		if (comment === "" || comment == null) {
			console.log("votre commentaire ne peut être vide");
		} else {
			Axios.post(
				`http://localhost:5000/api/comments/${id}`,
				{
					comment,
				},
				{
					headers: {
						Authorization: "Bearer " + token,
					},
				}
			)
				.then(() => {
					console.log("Votre commentaire a été publié");
					HandleUpdate();
				})
				.catch((err) => console.log(err));
		}
	};

	return (
		<>
			{connected && <CreatePost HandleUpdate={HandleUpdate} />}
			{connected && (
				<>
					{post.map((postContent, key) => {
						return (
							<Container key={key} className="post">
								<div className="post__container">
									<div className="post__top">
										<div className="post__topLeft">
											<img
												className="post__topLeft__img"
												src={
													postContent.User.userImg
														? avatarUrl + postContent.User.userImg
														: "./assets/black_avatar.png"
												}
												alt="Profil"
											/>
											<span className="post__topLeft__username">
												{postContent.User.firstname} {postContent.User.lastname}
											</span>
											<span className="post__topLeft__date">
												- posté {format(postContent.createdAt, "FR")}
											</span>
										</div>
										<div className="post__topRight">
											{postContent.UserId === userId ? (
												<ModifyPost postContent={postContent} HandleUpdate={HandleUpdate} />
											) : null}
										</div>
									</div>
									<hr />
									<div className="post__center">
										<span className="post__center__text">{postContent.postTitle}</span>
										<img
											className="post__center__img"
											src={`${imgUrl}${postContent.postImg}`}
											alt={postContent.postImg}
										/>
									</div>
									<div className="post__bottom">
										<button
											className="post__bottomRight"
											onClick={() => setShowComment((prev) => !prev)}
										>
											<Image src="../assets/comment.png" className="post__bottomRight__icon" />
											<span className="post__bottom__text">
												{postContent.Comments.length} commentaires
											</span>
										</button>
									</div>
								</div>
								{showComment && (
									<Comment
										postContent={postContent}
										HandleUpdate={HandleUpdate}
										isUpdate={isUpdate}
									/>
								)}
								<hr />
								<form
									className="sendComment"
									onSubmit={(e) => {
										e.preventDefault();
									}}
								>
									<Image
										src={userImg ? `${avatarUrl}${userImg}` : "./assets/black_avatar.png"}
										className="comment__avatar"
										roundedCircle
									/>
									<input
										as="textarea"
										className="sendComment__input"
										placeholder="Écrivez un commentaire..."
										onChange={selectTextComment}
										onKeyPress={(event) =>
											event.key === "Enter" && handleComment(postContent.id, postContent)
										}
									/>
									<Image
										type="submit"
										src="./assets/plus.png"
										className="sendComment__icon"
										roundedCircle
										role="button"
										onClick={() => handleComment(postContent.id, postContent)}
									/>
								</form>
							</Container>
						);
					})}
				</>
			)}
		</>
	);
}
