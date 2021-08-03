import React, { useEffect, useState } from "react";
import { Container, Image } from "react-bootstrap";
import Axios from "axios";
import LikeDislike from "./LikeDislike";
import { format, register } from "timeago.js";
import { Timeago } from "../functions/Timeago";
import Comment from "./Comment";
import CreateComment from "./CreateComment";
import ModifyPost from "./ModifyPost";
import jwt_decode from "jwt-decode";

export default function Post() {
	const avatarUrl = "http://localhost:5000/avatars/";
	const imgUrl = "http://localhost:5000/images/";
	const [showComment, setShowComment] = useState(false);
	register("FR", Timeago);

	const [post, setPost] = useState([]);
	const value = `; ${document.cookie}`;
	const parts = value.split(`; token=`);
	const token = parts.pop().split(";").shift();
	const decoded = jwt_decode(token);
	const userId = decoded.userId;
	useEffect(() => {
		Axios.get("http://localhost:5000/api/posts", {
			headers: {
				Authorization: "Bearer " + token,
			},
		})
			.then((response) => {
				// console.log(response.data);
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
									{post.UserId === userId ? <ModifyPost post={post} /> : null}
									{/* <ModifyPost post={post} /> */}
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
								<LikeDislike post={post} />
								<button
									className="post__bottomRight"
									onClick={() => setShowComment((prev) => !prev)}
								>
									<Image src="../assets/comment.png" className="post__bottomRight__icon" />
									<span className="post__bottom__text">{post.Comments.length} commentaires</span>
								</button>
							</div>
						</div>
						{showComment && <Comment post={post} />}
						<hr />
						<CreateComment post={post} />
					</Container>
				);
			})}
		</>
	);
}
