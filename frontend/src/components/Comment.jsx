import Axios from "axios";
import React, { useEffect, useState } from "react";
import { Image } from "react-bootstrap";
import DeleteComment from "./DeleteComment";
import jwt_decode from "jwt-decode";
import { format, register } from "timeago.js";
import { Timeago } from "../functions/Timeago";

export default function Comment(post, isUpdate, handleUpdate) {
	console.log(isUpdate);
	const avatarUrl = "http://localhost:5000/avatars/";
	register("FR", Timeago);
	const token = localStorage.getItem("token");
	const decoded = jwt_decode(token);
	const userId = decoded.userId;
	// console.log(userId);

	/// Import des données des commentaires ////
	const [comments, setComments] = useState([]);

	useEffect(() => {
		Axios.get("http://localhost:5000/api/comments", {
			headers: {
				Authorization: "Bearer " + token,
			},
		})
			.then((response) => {
				// console.log(response.data);
				setComments(response.data);
				isUpdate = "true";
			})
			.catch((err) => {
				console.log(err);
				// window.alert('Une erreur est survenue, veuillez réessayer plus tard. Si le problème persiste, contactez l\'administrateur du site');
			});
	}, [token, isUpdate, handleUpdate]);

	return (
		<>
			{comments.map((comment, key) => {
				if (comment.PostId === post.post.id) {
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
									<div className="comment__detail">
										<div className="comment__name">
											{comment.User.firstname} {comment.User.lastname}
											<span className="comment__date">
												- posté {format(comment.createdAt, "FR")}
											</span>
										</div>
										<div className="comment__text">{comment.commentText}</div>
									</div>
									{comment.UserId === userId ? <DeleteComment comment={comment} /> : null}
								</div>
							</div>
						</div>
					);
				} else {
					return null;
				}
			})}
		</>
	);
}
